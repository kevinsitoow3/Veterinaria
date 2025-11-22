from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from models.models import ClinicalHistory as ClinicalHistoryModel
from schemas import ClinicalHistory, ClinicalHistoryCreate

router = APIRouter(prefix="/clinical-histories", tags=["Clinical Histories"])

@router.get("/")
def list_clinical_histories(db: Session = Depends(get_db)):
    clinical_histories = db.query(ClinicalHistoryModel).all()
    return {"historias_clinicas": clinical_histories}

@router.post("/")
def create_clinical_history(history: ClinicalHistoryCreate, db: Session = Depends(get_db)):
    db_history = ClinicalHistoryModel(
        id_mascota=history.id_mascota,
        id_veterinario=history.id_veterinario,
        id_cita=history.id_cita,
        peso_kg_animal=history.peso_kg_animal,
        temperatura_animal=history.temperatura_animal,
        sintomas=history.sintomas,
        diagnostico=history.diagnostico,
        plan_tratamiento=history.plan_tratamiento
    )
    db.add(db_history)
    db.commit()
    db.refresh(db_history)
    return {"mensaje": "Historia clínica creada correctamente", "history": db_history}

@router.get("/{history_id}")
def get_clinical_history(history_id: int, db: Session = Depends(get_db)):
    history = db.query(ClinicalHistoryModel).filter(ClinicalHistoryModel.id_historia == history_id).first()
    if not history:
        raise HTTPException(status_code=404, detail="Historia clínica no encontrada")
    return history

@router.put("/{history_id}")
def update_clinical_history(history_id: int, history_update: ClinicalHistoryCreate, db: Session = Depends(get_db)):
    history = db.query(ClinicalHistoryModel).filter(ClinicalHistoryModel.id_historia == history_id).first()
    if not history:
        raise HTTPException(status_code=404, detail="Historia clínica no encontrada")
    
    history.id_mascota = history_update.id_mascota
    history.id_veterinario = history_update.id_veterinario
    history.id_cita = history_update.id_cita
    history.peso_kg_animal = history_update.peso_kg_animal
    history.temperatura_animal = history_update.temperatura_animal
    history.sintomas = history_update.sintomas
    history.diagnostico = history_update.diagnostico
    history.plan_tratamiento = history_update.plan_tratamiento
    
    db.commit()
    db.refresh(history)
    return {"mensaje": "Historia clínica actualizada", "history": history}

@router.delete("/{history_id}")
def delete_clinical_history(history_id: int, db: Session = Depends(get_db)):
    history = db.query(ClinicalHistoryModel).filter(ClinicalHistoryModel.id_historia == history_id).first()
    if not history:
        raise HTTPException(status_code=404, detail="Historia clínica no encontrada")
    
    db.delete(history)
    db.commit()
    return {"mensaje": "Historia clínica eliminada"}
