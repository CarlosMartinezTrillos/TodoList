from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SOLO usar pymysql en Railway
SQLALCHEMY_DATABASE_URL = (
    "mysql+pymysql://root:XFpqfuTgzbyjpZbIqiZnvDJmYOnuvUjH"
    "@centerbeam.proxy.rlwy.net:24823/railway"
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()
