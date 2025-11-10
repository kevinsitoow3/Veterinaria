from decimal import Decimal
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app_Vet.database.config.database import get_db
from app_Vet.database.models.models import Treatment as TreatmentModel

router = APIRouter(prefix="/treatments", tags=["Treatments"])

class Treatment(BaseModel):
    id_tratamiento: str
    nombre_tratamiento: str
    descripcion_tratamiento: str
    precio_tratamiento: Decimal
    
    class Config:
        from_attributes = True

class TreatmentCreate(BaseModel):
    nombre_tratamiento: str
    descripcion_tratamiento: str
    precio_tratamiento: Decimal

@router.get("/")
def list_treatments(db: Session = Depends(get_db)):
    treatments = db.query(TreatmentModel).all()
    return {"tratamientos": treatments}

@router.post("/")
def create_treatment(treatment: TreatmentCreate, db: Session = Depends(get_db)):
    db_treatment = TreatmentModel(
        nombre_tratamiento=treatment.nombre_tratamiento,
        descripcion_tratamiento=treatment.descripcion_tratamiento,
        precio_tratamiento=treatment.precio_tratamiento
    )
    db.add(db_treatment)
    db.commit()
    db.refresh(db_treatment)
    return {"mensaje": "Tratamiento creado correctamente", "treatment": db_treatment}

@router.get("/{treatment_id}")
def get_treatment(treatment_id: str, db: Session = Depends(get_db)):
    treatment = db.query(TreatmentModel).filter(TreatmentModel.id_tratamiento == treatment_id).first()
    if not treatment:
        raise HTTPException(status_code=404, detail="Tratamiento no encontrado")
    return treatment

@router.put("/{treatment_id}")
def update_treatment(treatment_id: str, treatment_update: TreatmentCreate, db: Session = Depends(get_db)):
    treatment = db.query(TreatmentModel).filter(TreatmentModel.id_tratamiento == treatment_id).first()
    if not treatment:
        raise HTTPException(status_code=404, detail="Tratamiento no encontrado")
    
    treatment.nombre_tratamiento = treatment_update.nombre_tratamiento
    treatment.descripcion_tratamiento = treatment_update.descripcion_tratamiento
    treatment.precio_tratamiento = treatment_update.precio_tratamiento
    
    db.commit()
    db.refresh(treatment)
    return {"mensaje": "Tratamiento actualizado", "treatment": treatment}

@router.delete("/{treatment_id}")
def delete_treatment(treatment_id: str, db: Session = Depends(get_db)):
    treatment = db.query(TreatmentModel).filter(TreatmentModel.id_tratamiento == treatment_id).first()
    if not treatment:
        raise HTTPException(status_code=404, detail="Tratamiento no encontrado")
    
    db.delete(treatment)
    db.commit()
    return {"mensaje": "Tratamiento eliminado"}
