from pydantic import BaseModel, validator
from typing import Optional
from datetime import date, datetime
from app.models.task import TaskStatus, TaskPriority

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: Optional[TaskStatus] = TaskStatus.pending
    priority: Optional[TaskPriority] = TaskPriority.medium
    due_date: Optional[date] = None
    completed_at: Optional[datetime] = None
    category: Optional[str] = "general"

    # --------------------------
    # Validación para evitar errores si se envía ""
    # --------------------------
    @validator("due_date", pre=True)
    def empty_string_to_none(cls, v):
        return None if v == "" else v

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True  # ⚠ Importante para que SQLAlchemy funcione con FastAPI
