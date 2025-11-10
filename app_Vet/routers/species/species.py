import datetime
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app_Vet.database.config.database import get_db
from app_Vet.database.models.models import Species as SpeciesModel

router = APIRouter(prefix="/species", tags=["Species"])

class Species(BaseModel):
    id_especie: str
    nombre_de_especie: str
    fecha_creacion: datetime.datetime
    fecha_actualizacion: datetime.datetime
    
    class Config:
        from_attributes = True

class SpeciesCreate(BaseModel):
    nombre_de_especie: str

@router.get("/")
def list_species(db: Session = Depends(get_db)):
    species = db.query(SpeciesModel).all()
    return {"especies": species}

@router.post("/")
def create_species(specie: SpeciesCreate, db: Session = Depends(get_db)):
    db_species = SpeciesModel(
        nombre_de_especie=specie.nombre_de_especie
    )
    db.add(db_species)
    db.commit()
    db.refresh(db_species)
    return {"mensaje": "Especie creada correctamente", "species": db_species}

@router.get("/{species_id}")
def get_species(species_id: str, db: Session = Depends(get_db)):
    species = db.query(SpeciesModel).filter(SpeciesModel.id_especie == species_id).first()
    if not species:
        raise HTTPException(status_code=404, detail="Especie no encontrada")
    return species

@router.put("/{species_id}")
def update_species(species_id: str, species_update: SpeciesCreate, db: Session = Depends(get_db)):
    species = db.query(SpeciesModel).filter(SpeciesModel.id_especie == species_id).first()
    if not species:
        raise HTTPException(status_code=404, detail="Especie no encontrada")
    
    species.nombre_de_especie = species_update.nombre_de_especie
    
    db.commit()
    db.refresh(species)
    return {"mensaje": "Especie actualizada", "species": species}

@router.delete("/{species_id}")
def delete_species(species_id: str, db: Session = Depends(get_db)):
    species = db.query(SpeciesModel).filter(SpeciesModel.id_especie == species_id).first()
    if not species:
        raise HTTPException(status_code=404, detail="Especie no encontrada")
    
    db.delete(species)
    db.commit()
    return {"mensaje": "Especie eliminada"}
