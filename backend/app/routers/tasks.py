from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.schemas.task import TaskCreate, Task
from app.crud.tasks import get_tasks, create_task, search_tasks, update_task, delete_task
from app.routers.auth import get_current_user  # tu función de auth ya implementada
from app.models.user import User

router = APIRouter()  # ⚠ Quitar prefix aquí

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ------------ READ ALL ------------
@router.get("/", response_model=list[Task])
def read_tasks(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_tasks(db, current_user.id)

# ------------ CREATE ------------
@router.post("/", response_model=Task)
def add_task(task: TaskCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return create_task(db, task, current_user.id)

# ------------ SEARCH ------------
@router.get("/search/{text}", response_model=list[Task])
def search(text: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return search_tasks(db, text, current_user.id)

# ------------ UPDATE ------------
@router.put("/{task_id}", response_model=Task)
def edit_task(task_id: int, task: TaskCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    updated = update_task(db, task_id, task, current_user.id)
    if not updated:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated

# ------------ DELETE ------------
@router.delete("/{task_id}")
def remove_task(task_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    deleted = delete_task(db, task_id, current_user.id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}
