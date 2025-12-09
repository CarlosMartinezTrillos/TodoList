# app/schemas/user.py
from pydantic import BaseModel

# ----------------- Esquemas existentes -----------------
class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

# ----------------- Nuevo esquema para login -----------------
class UserLogin(BaseModel):
    email: str
    password: str
