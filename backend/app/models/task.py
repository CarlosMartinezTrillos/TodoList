from sqlalchemy import Column, Integer, String, Enum, Date, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base
import enum


class TaskStatus(str, enum.Enum):
    pending = "pending"
    in_progress = "in_progress"
    completed = "completed"
    cancelled = "cancelled"

class TaskPriority(str, enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String(500))

    status = Column(Enum(TaskStatus), default=TaskStatus.pending)
    priority = Column(Enum(TaskPriority), default=TaskPriority.medium)

    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    due_date = Column(Date, nullable=True)
    completed_at = Column(TIMESTAMP, nullable=True)

    category = Column(String(100), default="general")

    # Relación con usuario
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    user = relationship("User", back_populates="tasks")