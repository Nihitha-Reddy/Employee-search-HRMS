# Employee Search Microservice

This project implements a **FastAPI microservice** for an HR company to serve as an employee search directory.

## Features

✅ FastAPI backend  
✅ PostgreSQL database  
✅ Elasticsearch for optimized search  
✅ Pagination, filters, dynamic columns  
✅ Supports millions of records efficiently  
✅ Configurable columns per organization

---

## Setup & Installation

### Requirements

- Python >= 3.9
- PostgreSQL >= 12
- Elasticsearch >= 8.x
- Node.js & npm (if running frontend)

### Install dependencies

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Setup Database

- Create PostgreSQL database.
- Run migrations if any.
- Enable pg_trgm extension for fuzzy search (if not using Elasticsearch).

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;
```

### Run FastAPI

```bash
uvicorn app.main:app --reload
```

---

## Elasticsearch Setup

- Run Elasticsearch (Docker recommended):

```bash
docker run -p 9200:9200 -e "discovery.type=single-node" -e "xpack.security.enabled=false" docker.elastic.co/elasticsearch/elasticsearch:8.13.4
```

- Create index & mappings:

```json
PUT /employees
{
  "mappings": {
    "properties": {
      "first_name": { "type": "text" },
      "last_name": { "type": "text" },
      "contact_email": { "type": "keyword" },
      "department": { "type": "keyword" },
      "position": { "type": "keyword" },
      "location": { "type": "keyword" },
      "status": { "type": "keyword" }
    }
  }
}
```

- Sync existing DB data to Elasticsearch:

```bash
python app/es_sync.py
```

---

## Running Frontend

If you have the React frontend:

```bash
cd my-frontend
npm install
npm run dev
```

---

## Project Structure

```
app/
├── main.py
├── crud.py
├── models.py
├── schemas.py
├── database.py
├── es_sync.py
my-frontend/
...
```

---

# 📒 Employee Search API Reference

### 🏷️ Base URL:
```
http://localhost:8000/
```

---

## 🔎 GET `/employees`
**Description:**
Search employees with filters, pagination, and dynamic columns.

### Query Parameters:
| Parameter         | Type     | Description                       |
|--------------------|----------|-----------------------------------|
| `search`           | string   | Free text search query           |
| `status`           | string   | Filter by employee status        |
| `department`       | string   | Filter by department             |
| `position`         | string   | Filter by position               |
| `location`         | string   | Filter by location               |
| `visibleColumns`   | string   | Comma-separated columns to search in |
| `offset`           | integer  | Offset for pagination            |
| `limit`            | integer  | Limit of records per page        |

---

### Sample Request:
```
GET /employees?search=john&status=ACTIVE&offset=0&limit=50&visibleColumns=first_name,last_name
```

### Sample Response:
```json
{
  "items": [
    {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "contact_email": "john.doe@example.com",
      "department": "Engineering",
      "position": "Developer",
      "location": "New York",
      "status": "ACTIVE"
    },
    {
      "id": 2,
      "first_name": "Jane",
      "last_name": "Smith",
      "contact_email": "jane.smith@example.com",
      "department": "HR",
      "position": "Manager",
      "location": "Boston",
      "status": "ACTIVE"
    }
  ],
  "total": 2
}
```

---

## 🆕 POST `/employees`
**Description:**
Add a new employee.

### Request Body:
```json
{
  "first_name": "Alice",
  "last_name": "Williams",
  "contact_email": "alice.williams@example.com",
  "department": "Finance",
  "position": "Analyst",
  "location": "Chicago",
  "status": "ACTIVE"
}
```

### Sample Response:
```json
{
  "id": 3,
  "first_name": "Alice",
  "last_name": "Williams",
  "contact_email": "alice.williams@example.com",
  "department": "Finance",
  "position": "Analyst",
  "location": "Chicago",
  "status": "ACTIVE"
}
```

---

## 🗃️ GET `/employees/filters`
**Description:**
Get unique values for filters (like departments, positions, locations, statuses).

### Sample Response:
```json
{
  "departments": ["Engineering", "HR", "Finance"],
  "positions": ["Developer", "Manager", "Analyst"],
  "locations": ["New York", "Boston", "Chicago"]
}
```

---

## 🌟 Notes
✅ All endpoints return JSON.
✅ Search is performed on the `visibleColumns` if provided, otherwise defaults to all searchable columns.
✅ Pagination is supported with `offset` & `limit`.
✅ `total` indicates the total records that match the filters (useful for pagination).

## Notes

- The API only provides a **search endpoint**, CRUD endpoints for employees were not required by the task.
- Search is powered by Elasticsearch for millions of records.
- Columns & filters are configurable per organization.

---

## Suggested Repo Description & Tags

**Description:**  
`FastAPI microservice for employee search directory with PostgreSQL + Elasticsearch.`

**Tags:**  
`FastAPI`, `Elasticsearch`, `PostgreSQL`, `Employee Directory`, `HR`, `Search API`, `Backend`

---

© 2025 — Implemented by Nihitha Gudipati
