from decimal import Decimal
from uuid import UUID, uuid4
from typing import Optional
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/clinical-histories", tags=["Clinical Histories"])

class ClinicalHistory(BaseModel):
    id_historia: UUID
    id_mascota: UUID
    id_veterinario: UUID
    id_cita: Optional[UUID] = None
    peso_kg_animal: Decimal
    temperatura_animal: Decimal
    sintomas: str
    diagnostico: str
    plan_tratamiento: str

class ClinicalHistoryCreate(BaseModel):
    id_mascota: UUID
    id_veterinario: UUID
    id_cita: Optional[UUID] = None
    peso_kg_animal: Decimal
    temperatura_animal: Decimal
    sintomas: str
    diagnostico: str
    plan_tratamiento: str

clinical_histories = []

@router.get("/")
def list_clinical_histories():
    return {"historias_clinicas": clinical_histories}

@router.post("/")
def create_clinical_history(history: ClinicalHistoryCreate):
    new_history = ClinicalHistory(
        id_historia=uuid4(),
        id_mascota=history.id_mascota,
        id_veterinario=history.id_veterinario,
        id_cita=history.id_cita,
        peso_kg_animal=history.peso_kg_animal,
        temperatura_animal=history.temperatura_animal,
        sintomas=history.sintomas,
        diagnostico=history.diagnostico,
        plan_tratamiento=history.plan_tratamiento
    )
    clinical_histories.append(new_history)
    return {"mensaje": "Historia clínica creada correctamente", "history": new_history}

@router.get("/{history_id}")
def get_clinical_history(history_id: UUID):
    for history in clinical_histories:
        if history.id_historia == history_id:
            return history
    return {"error": "Historia clínica no encontrada"}

@router.put("/{history_id}")
def update_clinical_history(history_id: UUID, history_update: ClinicalHistoryCreate):
    for i, history in enumerate(clinical_histories):
        if history.id_historia == history_id:
            clinical_histories[i] = ClinicalHistory(
                id_historia=history_id,
                id_mascota=history_update.id_mascota,
                id_veterinario=history_update.id_veterinario,
                id_cita=history_update.id_cita,
                peso_kg_animal=history_update.peso_kg_animal,
                temperatura_animal=history_update.temperatura_animal,
                sintomas=history_update.sintomas,
                diagnostico=history_update.diagnostico,
                plan_tratamiento=history_update.plan_tratamiento
            )
            return {"mensaje": "Historia clínica actualizada", "history": clinical_histories[i]}
    return {"error": "Historia clínica no encontrada"}

@router.delete("/{history_id}")
def delete_clinical_history(history_id: UUID):
    for i, history in enumerate(clinical_histories):
        if history.id_historia == history_id:
            clinical_histories.pop(i)
            return {"mensaje": "Historia clínica eliminada"}
    return {"error": "Historia clínica no encontrada"}

