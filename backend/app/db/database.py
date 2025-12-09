from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Cambiar este valor a True si quieres usar Railway, False si quieres local
USE_RAILWAY = True

if USE_RAILWAY:
    SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:XFpqfuTgzbyjpZbIqiZnvDJmYOnuvUjH@centerbeam.proxy.rlwy.net:24823/railway"
else:
    SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:@localhost:3306/todo_db"


engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

