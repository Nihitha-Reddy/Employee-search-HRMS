from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from .database import get_db, async_engine
from .models import Base, User
from .schemas import EmployeeCreate, EmployeeRead
from .crud import get_employees, create_employee

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.get("/employees")
async def read_employees(
    search: str = "",
    status: str = "",
    department: str = "",
    position: str = "",
    location: str = "",
    visibleColumns: str = "",
    offset: int = 0,
    limit: int = 50,
    db: AsyncSession = Depends(get_db)  # passed but unused
):
    return await get_employees(
        db=db,
        search=search,
        status=status,
        department=department,
        position=position,
        location=location,
        visibleColumns=visibleColumns,
        offset=offset,
        limit=limit
    )

@app.post("/employees", response_model=EmployeeRead)
async def add_employee(employee: EmployeeCreate, db: AsyncSession = Depends(get_db)):
    return await create_employee(db, employee)

@app.get("/employees/filters")
async def get_filter_options(db: AsyncSession = Depends(get_db)):
    filters = {}
    for field in ["department", "position", "location"]:
        stmt = select(getattr(User, field)).distinct().where(getattr(User, field) != None)
        result = await db.execute(stmt)
        filters[field + "s"] = [row[0] for row in result.fetchall()]
    return filters
