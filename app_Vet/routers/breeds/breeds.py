import datetime
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app_Vet.database.config.database import get_db
from app_Vet.database.models.models import Breed as BreedModel

router = APIRouter(prefix="/breeds", tags=["Breeds"])

class Breed(BaseModel):
    id_raza: str
    id_especie: str
    nombre_raza: str
    fecha_creacion: datetime.datetime
    fecha_actualizacion: datetime.datetime
    
    class Config:
        from_attributes = True

class BreedCreate(BaseModel):
    id_especie: str
    nombre_raza: str

@router.get("/")
def list_breeds(db: Session = Depends(get_db)):
    breeds = db.query(BreedModel).all()
    return {"razas": breeds}

@router.post("/")
def create_breed(breed: BreedCreate, db: Session = Depends(get_db)):
    db_breed = BreedModel(
        id_especie=breed.id_especie,
        nombre_raza=breed.nombre_raza
    )
    db.add(db_breed)
    db.commit()
    db.refresh(db_breed)
    return {"mensaje": "Raza creada correctamente", "breed": db_breed}

@router.get("/{breed_id}")
def get_breed(breed_id: str, db: Session = Depends(get_db)):
    breed = db.query(BreedModel).filter(BreedModel.id_raza == breed_id).first()
    if not breed:
        raise HTTPException(status_code=404, detail="Raza no encontrada")
    return breed

@router.put("/{breed_id}")
def update_breed(breed_id: str, breed_update: BreedCreate, db: Session = Depends(get_db)):
    breed = db.query(BreedModel).filter(BreedModel.id_raza == breed_id).first()
    if not breed:
        raise HTTPException(status_code=404, detail="Raza no encontrada")
    
    breed.id_especie = breed_update.id_especie
    breed.nombre_raza = breed_update.nombre_raza
    
    db.commit()
    db.refresh(breed)
    return {"mensaje": "Raza actualizada", "breed": breed}

@router.delete("/{breed_id}")
def delete_breed(breed_id: str, db: Session = Depends(get_db)):
    breed = db.query(BreedModel).filter(BreedModel.id_raza == breed_id).first()
    if not breed:
        raise HTTPException(status_code=404, detail="Raza no encontrada")
    
    db.delete(breed)
    db.commit()
    return {"mensaje": "Raza eliminada"}
