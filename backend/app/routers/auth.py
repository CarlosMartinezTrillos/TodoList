from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.schemas.user import UserCreate, UserLogin, User
from app.crud.users import create_user, get_user_by_email, get_user_by_username, verify_password
from jose import jwt, JWTError
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext

SECRET_KEY = "TU_SECRETO_AQUI"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------- REGISTER ----------------
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    if get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email ya registrado")
    if get_user_by_username(db, user.username):
        raise HTTPException(status_code=400, detail="Usuario ya registrado")

    new_user = create_user(db, user.username, user.email, user.password)

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token = jwt.encode({"sub": new_user.email, "exp": expire}, SECRET_KEY, algorithm=ALGORITHM)

    return {
        "user": new_user,
        "token": token
    }

# ---------------- LOGIN ----------------
@router.post("/login")
def login(form_data: UserLogin, db: Session = Depends(get_db)):
    user = get_user_by_email(db, form_data.email)
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Email o contraseña incorrectos")

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token = jwt.encode({"sub": user.email, "exp": expire}, SECRET_KEY, algorithm=ALGORITHM)

    return {
        "user": user,
        "token": token
    }

# ---------------- GET CURRENT USER ----------------
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Token inválido")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")

    user = get_user_by_email(db, email)
    if not user:
        raise HTTPException(status_code=401, detail="Usuario no encontrado")

    return user

@router.get("/me", response_model=User)
def me(current_user: User = Depends(get_current_user)):
    return current_user
