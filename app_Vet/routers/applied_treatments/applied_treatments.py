from decimal import Decimal
from uuid import UUID, uuid4
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/applied-treatments", tags=["Applied Treatments"])

class AppliedTreatment(BaseModel):
    id_aplicacion: UUID
    id_historia: UUID
    id_tratamiento: UUID
    cantidad: Decimal
    precio_aplicado: Decimal
    total: Decimal

class AppliedTreatmentCreate(BaseModel):
    id_historia: UUID
    id_tratamiento: UUID
    cantidad: Decimal
    precio_aplicado: Decimal
    total: Decimal

applied_treatments = []

@router.get("/")
def list_applied_treatments():
    return {"tratamientos_aplicados": applied_treatments}

@router.post("/")
def create_applied_treatment(applied_treatment: AppliedTreatmentCreate):
    new_applied_treatment = AppliedTreatment(
        id_aplicacion=uuid4(),
        id_historia=applied_treatment.id_historia,
        id_tratamiento=applied_treatment.id_tratamiento,
        cantidad=applied_treatment.cantidad,
        precio_aplicado=applied_treatment.precio_aplicado,
        total=applied_treatment.total
    )
    applied_treatments.append(new_applied_treatment)
    return {"mensaje": "Tratamiento aplicado creado correctamente", "applied_treatment": new_applied_treatment}

@router.get("/{applied_treatment_id}")
def get_applied_treatment(applied_treatment_id: UUID):
    for at in applied_treatments:
        if at.id_aplicacion == applied_treatment_id:
            return at
    return {"error": "Tratamiento aplicado no encontrado"}

@router.put("/{applied_treatment_id}")
def update_applied_treatment(applied_treatment_id: UUID, applied_treatment_update: AppliedTreatmentCreate):
    for i, at in enumerate(applied_treatments):
        if at.id_aplicacion == applied_treatment_id:
            applied_treatments[i] = AppliedTreatment(
                id_aplicacion=applied_treatment_id,
                id_historia=applied_treatment_update.id_historia,
                id_tratamiento=applied_treatment_update.id_tratamiento,
                cantidad=applied_treatment_update.cantidad,
                precio_aplicado=applied_treatment_update.precio_aplicado,
                total=applied_treatment_update.total
            )
            return {"mensaje": "Tratamiento aplicado actualizado", "applied_treatment": applied_treatments[i]}
    return {"error": "Tratamiento aplicado no encontrado"}

@router.delete("/{applied_treatment_id}")
def delete_applied_treatment(applied_treatment_id: UUID):
    for i, at in enumerate(applied_treatments):
        if at.id_aplicacion == applied_treatment_id:
            applied_treatments.pop(i)
            return {"mensaje": "Tratamiento aplicado eliminado"}
    return {"error": "Tratamiento aplicado no encontrado"}

