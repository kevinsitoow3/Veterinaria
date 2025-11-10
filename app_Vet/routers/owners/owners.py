import datetime
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app_Vet.database.config.database import get_db
from app_Vet.database.models.models import Owner as OwnerModel

router = APIRouter(prefix="/owners", tags=["Owners"])

class Owner(BaseModel):
    id_dueño: str
    nombre_dueño: str
    telefono_dueño: str
    correo_dueño: str
    direccion_dueño: str
    fecha_creacion: datetime.datetime
    fecha_actualizacion: datetime.datetime
    
    class Config:
        from_attributes = True

class OwnerCreate(BaseModel):
    nombre_dueño: str
    telefono_dueño: str
    correo_dueño: str
    direccion_dueño: str

@router.get("/")
def list_owners(db: Session = Depends(get_db)):
    owners = db.query(OwnerModel).all()
    return {"dueños": owners}

@router.post("/")
def create_owner(owner: OwnerCreate, db: Session = Depends(get_db)):
    db_owner = OwnerModel(
        nombre_dueño=owner.nombre_dueño,
        telefono_dueño=owner.telefono_dueño,
        correo_dueño=owner.correo_dueño,
        direccion_dueño=owner.direccion_dueño
    )
    db.add(db_owner)
    db.commit()
    db.refresh(db_owner)
    return {"mensaje": "Dueño creado correctamente", "owner": db_owner}

@router.get("/{owner_id}")
def get_owner(owner_id: str, db: Session = Depends(get_db)):
    owner = db.query(OwnerModel).filter(OwnerModel.id_dueño == owner_id).first()
    if not owner:
        raise HTTPException(status_code=404, detail="Dueño no encontrado")
    return owner

@router.put("/{owner_id}")
def update_owner(owner_id: str, owner_update: OwnerCreate, db: Session = Depends(get_db)):
    owner = db.query(OwnerModel).filter(OwnerModel.id_dueño == owner_id).first()
    if not owner:
        raise HTTPException(status_code=404, detail="Dueño no encontrado")
    
    owner.nombre_dueño = owner_update.nombre_dueño
    owner.telefono_dueño = owner_update.telefono_dueño
    owner.correo_dueño = owner_update.correo_dueño
    owner.direccion_dueño = owner_update.direccion_dueño
    
    db.commit()
    db.refresh(owner)
    return {"mensaje": "Dueño actualizado", "owner": owner}

@router.delete("/{owner_id}")
def delete_owner(owner_id: str, db: Session = Depends(get_db)):
    owner = db.query(OwnerModel).filter(OwnerModel.id_dueño == owner_id).first()
    if not owner:
        raise HTTPException(status_code=404, detail="Dueño no encontrado")
    
    db.delete(owner)
    db.commit()
    return {"mensaje": "Dueño eliminado"}
