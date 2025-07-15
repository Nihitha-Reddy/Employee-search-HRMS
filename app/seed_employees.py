import asyncio
import random
from faker import Faker
from .models import User
from .database import AsyncSessionLocal

DEPARTMENTS = [
    "Engineering", "HR", "Sales", "Marketing", "Finance", "Support", "Legal", "Product", "QA", "Design"
]
POSITIONS = [
    "Manager", "Developer", "Analyst", "Intern", "Lead", "Director", "Architect", "Consultant", "Specialist", "Coordinator"
]
LOCATIONS = [
    "New York", "London", "Berlin", "Tokyo", "Remote", "San Francisco", "Paris", "Sydney", "Toronto", "Singapore"
]
STATUS = ["ACTIVE", "NOT_STARTED", "TERMINATED", "ON_LEAVE", "RETIRED"]

fake = Faker()

async def seed():
    async with AsyncSessionLocal() as session:
        users = []
        for i in range(10000):
            first = fake.first_name()
            last = fake.last_name()
            email = f"{first.lower()}.{last.lower()}{i}@{fake.free_email_domain()}"
            user = User(
                first_name=first,
                last_name=last,
                contact_email=email,
                department=random.choice(DEPARTMENTS),
                position=random.choice(POSITIONS),
                location=random.choice(LOCATIONS),
                status=random.choice(STATUS)
            )
            users.append(user)
        session.add_all(users)
        await session.commit()
        print("Seeded 10,000 employees!")

if __name__ == "__main__":
    asyncio.run(seed())
