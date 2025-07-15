from elasticsearch import AsyncElasticsearch
import logging


es = AsyncElasticsearch("http://localhost:9200")

# Configure logging
logging.basicConfig(level=logging.DEBUG)


async def get_employees(
    db=None,  # not used anymore, but kept to not break interface
    search: str = "",
    status: str = "",
    department: str = "",
    position: str = "",
    location: str = "",
    visibleColumns: str = "",
    offset: int = 0,
    limit: int = 50
) -> dict:
    must_clauses = []

    default_columns = [
        'first_name', 'last_name', 'contact_email',
        'department', 'position', 'location'
    ]

    raw_visible_columns = [c for c in visibleColumns.split(",") if c]
    visible_columns = [c for c in raw_visible_columns if c in default_columns]

    if not visible_columns:
        visible_columns = default_columns

    # filters
    if status:
        must_clauses.append({"match": {"status": status}})
    if department:
        must_clauses.append({"match": {"department": department}})
    if position:
        must_clauses.append({"match": {"position": position}})
    if location:
        must_clauses.append({"match": {"location": location}})

    # search
    if search.strip() and visible_columns:
        should_clauses = []
        for col in visible_columns:
            if col in ["first_name", "last_name"]:  # text fields
                should_clauses.append({
                    "match_phrase_prefix": {col: search.strip()}
                })
            else:  # keyword fields
                should_clauses.append({
                    "match": {col: search.strip()}
                })
        must_clauses.append({"bool": {"should": should_clauses}})

    # If no filters or search are provided, return all data
    if not search.strip() and not status and not department and not position and not location:
        query = {"match_all": {}}
    else:
        query = {"bool": {"must": must_clauses}}

    # Log the constructed query
    logging.debug("Constructed Query: %s", query)

    # Log the offset and size parameters
    logging.debug("Offset: %s, Size: %s", offset, limit)

    resp = await es.search(
        index="employees",
        query=query,
        from_=offset,
        size=limit
    )

    # Log the response
    logging.debug("Elasticsearch Response: %s", resp)

    items = [
        {**hit["_source"], "id": hit["_id"]}
        for hit in resp["hits"]["hits"]
    ]
    total = resp["hits"]["total"]["value"]

    return {"items": items, "total": total}


async def create_employee(db, employee):
    """
    This still writes to Postgres.
    You can optionally also index into ES here.
    """
    from models import User
    new_emp = User(**employee.dict())
    db.add(new_emp)
    await db.commit()
    await db.refresh(new_emp)
    return new_emp
