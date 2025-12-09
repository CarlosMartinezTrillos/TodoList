from sqlalchemy.orm import Session
from app.models.task import Task
from app.schemas.task import TaskCreate

# ---------------- READ ----------------
def get_tasks(db: Session, user_id: int):
    return db.query(Task).filter(Task.user_id == user_id).all()

# ---------------- CREATE ----------------
def create_task(db: Session, task: TaskCreate, user_id: int):
    db_task = Task(**task.dict(), user_id=user_id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

# ---------------- SEARCH ----------------
def search_tasks(db: Session, text: str, user_id: int):
    return db.query(Task).filter(Task.user_id == user_id, Task.title.like(f"%{text}%")).all()

# ---------------- UPDATE ----------------
def update_task(db: Session, task_id: int, task_data: TaskCreate, user_id: int):
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == user_id).first()
    if not task:
        return None
    for key, value in task_data.dict().items():
        setattr(task, key, value)
    db.commit()
    db.refresh(task)
    return task

# ---------------- DELETE ----------------
def delete_task(db: Session, task_id: int, user_id: int):
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == user_id).first()
    if not task:
        return None
    db.delete(task)
    db.commit()
    return True
