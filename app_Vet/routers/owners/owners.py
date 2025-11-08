import datetime
from uuid import UUID, uuid4
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/owners", tags=["Owners"])

class Owner(BaseModel):
    id_dueño: UUID
    nombre_dueño: str
    telefono_dueño: str
    correo_dueño: str
    direccion_dueño: str
    fecha_creacion: datetime.datetime
    fecha_actualizacion: datetime.datetime

class OwnerCreate(BaseModel):
    nombre_dueño: str
    telefono_dueño: str
    correo_dueño: str
    direccion_dueño: str

owners = []

@router.get("/")
def list_owners():
    return {"dueños": owners}

@router.post("/")
def create_owner(owner: OwnerCreate):
    new_owner = Owner(
        id_dueño=uuid4(),
        nombre_dueño=owner.nombre_dueño,
        telefono_dueño=owner.telefono_dueño,
        correo_dueño=owner.correo_dueño,
        direccion_dueño=owner.direccion_dueño,
        fecha_creacion=datetime.datetime.now(),
        fecha_actualizacion=datetime.datetime.now()
    )
    owners.append(new_owner)
    return {"mensaje": "Dueño creado correctamente", "owner": new_owner}

@router.get("/{owner_id}")
def get_owner(owner_id: UUID):
    for owner in owners:
        if owner.id_dueño == owner_id:
            return owner
    return {"error": "Dueño no encontrado"}

@router.put("/{owner_id}")
def update_owner(owner_id: UUID, owner_update: OwnerCreate):
    for i, owner in enumerate(owners):
        if owner.id_dueño == owner_id:
            owners[i] = Owner(
                id_dueño=owner_id,
                nombre_dueño=owner_update.nombre_dueño,
                telefono_dueño=owner_update.telefono_dueño,
                correo_dueño=owner_update.correo_dueño,
                direccion_dueño=owner_update.direccion_dueño,
                fecha_creacion=owner.fecha_creacion,
                fecha_actualizacion=datetime.datetime.now()
            )
            return {"mensaje": "Dueño actualizado", "owner": owners[i]}
    return {"error": "Dueño no encontrado"}

@router.delete("/{owner_id}")
def delete_owner(owner_id: UUID):
    for i, owner in enumerate(owners):
        if owner.id_dueño == owner_id:
            owners.pop(i)
            return {"mensaje": "Dueño eliminado"}
    return {"error": "Dueño no encontrado"}

