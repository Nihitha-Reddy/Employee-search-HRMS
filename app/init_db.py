# init_db.py
import asyncio
from .database import async_engine
from .models import Base

async def create_tables():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)    # ← Drop old tables
        await conn.run_sync(Base.metadata.create_all)  # ← Recreate with new fields

asyncio.run(create_tables())
