import datetime
from uuid import UUID
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app_Vet.database.config.database import get_db
from app_Vet.database.models.models import Pet as PetModel

router = APIRouter(prefix="/pets", tags=["Pets"])

class Pet(BaseModel):
    id_mascota: str
    id_dueño: str
    nombre_mascota: str
    id_especie: str
    id_raza: Optional[str] = None
    sexo_animal: str
    fecha_nacimiento: datetime.date
    color: str
    estado: str
    fecha_creacion: datetime.datetime
    fecha_actualizacion: datetime.datetime
    
    class Config:
        from_attributes = True

class PetCreate(BaseModel):
    id_dueño: str
    nombre_mascota: str
    id_especie: str
    id_raza: Optional[str] = None
    sexo_animal: str
    fecha_nacimiento: datetime.date
    color: str
    estado: str

@router.get("/")
def list_pets(db: Session = Depends(get_db)):
    pets = db.query(PetModel).all()
    return {"mascotas": pets}

@router.post("/")
def create_pet(pet: PetCreate, db: Session = Depends(get_db)):
    db_pet = PetModel(
        id_dueño=pet.id_dueño,
        nombre_mascota=pet.nombre_mascota,
        id_especie=pet.id_especie,
        id_raza=pet.id_raza,
        sexo_animal=pet.sexo_animal,
        fecha_nacimiento=pet.fecha_nacimiento,
        color=pet.color,
        estado=pet.estado
    )
    db.add(db_pet)
    db.commit()
    db.refresh(db_pet)
    return {"mensaje": "Mascota creada correctamente", "pet": db_pet}

@router.get("/{pet_id}")
def get_pet(pet_id: str, db: Session = Depends(get_db)):
    pet = db.query(PetModel).filter(PetModel.id_mascota == pet_id).first()
    if not pet:
        raise HTTPException(status_code=404, detail="Mascota no encontrada")
    return pet

@router.put("/{pet_id}")
def update_pet(pet_id: str, pet_update: PetCreate, db: Session = Depends(get_db)):
    pet = db.query(PetModel).filter(PetModel.id_mascota == pet_id).first()
    if not pet:
        raise HTTPException(status_code=404, detail="Mascota no encontrada")
    
    pet.id_dueño = pet_update.id_dueño
    pet.nombre_mascota = pet_update.nombre_mascota
    pet.id_especie = pet_update.id_especie
    pet.id_raza = pet_update.id_raza
    pet.sexo_animal = pet_update.sexo_animal
    pet.fecha_nacimiento = pet_update.fecha_nacimiento
    pet.color = pet_update.color
    pet.estado = pet_update.estado
    
    db.commit()
    db.refresh(pet)
    return {"mensaje": "Mascota actualizada", "pet": pet}

@router.delete("/{pet_id}")
def delete_pet(pet_id: str, db: Session = Depends(get_db)):
    pet = db.query(PetModel).filter(PetModel.id_mascota == pet_id).first()
    if not pet:
        raise HTTPException(status_code=404, detail="Mascota no encontrada")
    
    db.delete(pet)
    db.commit()
    return {"mensaje": "Mascota eliminada"}
