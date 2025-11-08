from decimal import Decimal
from uuid import UUID, uuid4
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/treatments", tags=["Treatments"])

class Treatment(BaseModel):
    id_tratamiento: UUID
    nombre_tratamiento: str
    descripcion_tratamiento: str
    precio_tratamiento: Decimal

class TreatmentCreate(BaseModel):
    nombre_tratamiento: str
    descripcion_tratamiento: str
    precio_tratamiento: Decimal

treatments = []

@router.get("/")
def list_treatments():
    return {"tratamientos": treatments}

@router.post("/")
def create_treatment(treatment: TreatmentCreate):
    new_treatment = Treatment(
        id_tratamiento=uuid4(),
        nombre_tratamiento=treatment.nombre_tratamiento,
        descripcion_tratamiento=treatment.descripcion_tratamiento,
        precio_tratamiento=treatment.precio_tratamiento
    )
    treatments.append(new_treatment)
    return {"mensaje": "Tratamiento creado correctamente", "treatment": new_treatment}

@router.get("/{treatment_id}")
def get_treatment(treatment_id: UUID):
    for treatment in treatments:
        if treatment.id_tratamiento == treatment_id:
            return treatment
    return {"error": "Tratamiento no encontrado"}

@router.put("/{treatment_id}")
def update_treatment(treatment_id: UUID, treatment_update: TreatmentCreate):
    for i, treatment in enumerate(treatments):
        if treatment.id_tratamiento == treatment_id:
            treatments[i] = Treatment(
                id_tratamiento=treatment_id,
                nombre_tratamiento=treatment_update.nombre_tratamiento,
                descripcion_tratamiento=treatment_update.descripcion_tratamiento,
                precio_tratamiento=treatment_update.precio_tratamiento
            )
            return {"mensaje": "Tratamiento actualizado", "treatment": treatments[i]}
    return {"error": "Tratamiento no encontrado"}

@router.delete("/{treatment_id}")
def delete_treatment(treatment_id: UUID):
    for i, treatment in enumerate(treatments):
        if treatment.id_tratamiento == treatment_id:
            treatments.pop(i)
            return {"mensaje": "Tratamiento eliminado"}
    return {"error": "Tratamiento no encontrado"}

