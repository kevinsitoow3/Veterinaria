from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from models.models import AppliedTreatment as AppliedTreatmentModel
from schemas import AppliedTreatment, AppliedTreatmentCreate

router = APIRouter(prefix="/applied-treatments", tags=["Applied Treatments"])

@router.get("/")
def list_applied_treatments(db: Session = Depends(get_db)):
    applied_treatments = db.query(AppliedTreatmentModel).all()
    return {"tratamientos_aplicados": applied_treatments}

@router.post("/")
def create_applied_treatment(applied_treatment: AppliedTreatmentCreate, db: Session = Depends(get_db)):
    db_applied_treatment = AppliedTreatmentModel(
        id_historia=applied_treatment.id_historia,
        id_tratamiento=applied_treatment.id_tratamiento,
        cantidad=applied_treatment.cantidad,
        precio_aplicado=applied_treatment.precio_aplicado,
        total=applied_treatment.total
    )
    db.add(db_applied_treatment)
    db.commit()
    db.refresh(db_applied_treatment)
    return {"mensaje": "Tratamiento aplicado creado correctamente", "applied_treatment": db_applied_treatment}

@router.get("/{applied_treatment_id}")
def get_applied_treatment(applied_treatment_id: int, db: Session = Depends(get_db)):
    applied_treatment = db.query(AppliedTreatmentModel).filter(AppliedTreatmentModel.id_aplicacion == applied_treatment_id).first()
    if not applied_treatment:
        raise HTTPException(status_code=404, detail="Tratamiento aplicado no encontrado")
    return applied_treatment

@router.put("/{applied_treatment_id}")
def update_applied_treatment(applied_treatment_id: int, applied_treatment_update: AppliedTreatmentCreate, db: Session = Depends(get_db)):
    applied_treatment = db.query(AppliedTreatmentModel).filter(AppliedTreatmentModel.id_aplicacion == applied_treatment_id).first()
    if not applied_treatment:
        raise HTTPException(status_code=404, detail="Tratamiento aplicado no encontrado")
    
    applied_treatment.id_historia = applied_treatment_update.id_historia
    applied_treatment.id_tratamiento = applied_treatment_update.id_tratamiento
    applied_treatment.cantidad = applied_treatment_update.cantidad
    applied_treatment.precio_aplicado = applied_treatment_update.precio_aplicado
    applied_treatment.total = applied_treatment_update.total
    
    db.commit()
    db.refresh(applied_treatment)
    return {"mensaje": "Tratamiento aplicado actualizado", "applied_treatment": applied_treatment}

@router.delete("/{applied_treatment_id}")
def delete_applied_treatment(applied_treatment_id: int, db: Session = Depends(get_db)):
    applied_treatment = db.query(AppliedTreatmentModel).filter(AppliedTreatmentModel.id_aplicacion == applied_treatment_id).first()
    if not applied_treatment:
        raise HTTPException(status_code=404, detail="Tratamiento aplicado no encontrado")
    
    db.delete(applied_treatment)
    db.commit()
    return {"mensaje": "Tratamiento aplicado eliminado"}
