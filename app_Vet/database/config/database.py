from sqlalchemy.orm.session import Session


import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


sqlliteName = "veterinary.sqlite"
base_dir = os.path.dirname(os.path.abspath(__file__))
database_url = f"sqlite:///{os.path.join(base_dir, sqlliteName)}"


engine = create_engine(database_url, echo=True,
    connect_args={"check_same_thread": False} if "sqlite" in database_url else {}
)

Session= sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base = declarative_base()

def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()

