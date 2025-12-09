from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import tasks, auth

app = FastAPI(
    title="Todo App API",
    description="API para gestionar tareas con autenticación de usuarios",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://toddollistc.netlify.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Routers
app.include_router(tasks.router, prefix="/tasks", tags=["Tasks"])
app.include_router(auth.router, prefix="/auth", tags=["Auth"])

@app.get("/")
def root():
    return {"message": "API de Todo App funcionando correctamente"}
