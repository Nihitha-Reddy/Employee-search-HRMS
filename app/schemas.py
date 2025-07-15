from pydantic import BaseModel

class EmployeeCreate(BaseModel):
    first_name: str
    last_name: str
    contact_email: str
    department: str = ""
    position: str = ""
    location: str = ""
    status: str = "ACTIVE"

class EmployeeRead(EmployeeCreate):
    id: int

    class Config:
        from_attributes = True
