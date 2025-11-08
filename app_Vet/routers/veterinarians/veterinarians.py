import datetime
from uuid import UUID, uuid4
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/veterinarians", tags=["Veterinarians"])

class Veterinarian(BaseModel):
    id_veterinario: UUID
    nombre_veterinario: str
    correo_veterinario: str
    telefono_veterinario: str
    especialidad_veterinario: str
    estado_veterinario: bool
    fecha_creacion: datetime.datetime
    fecha_actualizacion: datetime.datetime

class VeterinarianCreate(BaseModel):
    nombre_veterinario: str
    correo_veterinario: str
    telefono_veterinario: str
    especialidad_veterinario: str
    estado_veterinario: bool

veterinarians = []

@router.get("/")
def list_veterinarians():
    return {"veterinarios": veterinarians}

@router.post("/")
def create_veterinarian(veterinarian: VeterinarianCreate):
    new_veterinarian = Veterinarian(
        id_veterinario=uuid4(),
        nombre_veterinario=veterinarian.nombre_veterinario,
        correo_veterinario=veterinarian.correo_veterinario,
        telefono_veterinario=veterinarian.telefono_veterinario,
        especialidad_veterinario=veterinarian.especialidad_veterinario,
        estado_veterinario=veterinarian.estado_veterinario,
        fecha_creacion=datetime.datetime.now(),
        fecha_actualizacion=datetime.datetime.now()
    )
    veterinarians.append(new_veterinarian)
    return {"mensaje": "Veterinario creado correctamente", "veterinarian": new_veterinarian}

@router.get("/{veterinarian_id}")
def get_veterinarian(veterinarian_id: UUID):
    for vet in veterinarians:
        if vet.id_veterinario == veterinarian_id:
            return vet
    return {"error": "Veterinario no encontrado"}

@router.put("/{veterinarian_id}")
def update_veterinarian(veterinarian_id: UUID, veterinarian_update: VeterinarianCreate):
    for i, vet in enumerate(veterinarians):
        if vet.id_veterinario == veterinarian_id:
            veterinarians[i] = Veterinarian(
                id_veterinario=veterinarian_id,
                nombre_veterinario=veterinarian_update.nombre_veterinario,
                correo_veterinario=veterinarian_update.correo_veterinario,
                telefono_veterinario=veterinarian_update.telefono_veterinario,
                especialidad_veterinario=veterinarian_update.especialidad_veterinario,
                estado_veterinario=veterinarian_update.estado_veterinario,
                fecha_creacion=vet.fecha_creacion,
                fecha_actualizacion=datetime.datetime.now()
            )
            return {"mensaje": "Veterinario actualizado", "veterinarian": veterinarians[i]}
    return {"error": "Veterinario no encontrado"}

@router.delete("/{veterinarian_id}")
def delete_veterinarian(veterinarian_id: UUID):
    for i, vet in enumerate(veterinarians):
        if vet.id_veterinario == veterinarian_id:
            veterinarians.pop(i)
            return {"mensaje": "Veterinario eliminado"}
    return {"error": "Veterinario no encontrado"}

