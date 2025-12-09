from sqlalchemy.orm import Session
from app.models.user import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ---------------- GET USER ----------------
def get_user_by_email(db: Session, email: str) -> User | None:
    """Devuelve el usuario por email, o None si no existe"""
    return db.query(User).filter(User.email == email).first()

def get_user_by_username(db: Session, username: str) -> User | None:
    """Devuelve el usuario por username, o None si no existe"""
    return db.query(User).filter(User.username == username).first()

# ---------------- CREATE USER ----------------
def create_user(db: Session, username: str, email: str, password: str) -> User:
    """
    Crea un nuevo usuario con hash de contraseña
    """
    hashed_password = pwd_context.hash(password)
    db_user = User(
        username=username,
        email=email,
        password_hash=hashed_password  # ✅ asegurarse de que el modelo User tenga password_hash
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# ---------------- VERIFY PASSWORD ----------------
def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica que la contraseña proporcionada coincida con el hash
    """
    return pwd_context.verify(plain_password, hashed_password)
