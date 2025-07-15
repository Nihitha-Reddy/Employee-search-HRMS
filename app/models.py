from sqlalchemy import Column, Integer, String
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    contact_email = Column(String)
    department = Column(String)
    position = Column(String)
    location = Column(String)
    status = Column(String)
