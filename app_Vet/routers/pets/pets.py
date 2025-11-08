import datetime
from uuid import UUID, uuid4
from typing import Optional
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/pets", tags=["Pets"])

class Pet(BaseModel):
    id_mascota: UUID
    id_dueño: UUID
    nombre_mascota: str
    id_especie: UUID
    id_raza: Optional[UUID] = None
    sexo_animal: str
    fecha_nacimiento: datetime.date
    color: str
    estado: str
    fecha_creacion: datetime.datetime
    fecha_actualizacion: datetime.datetime

class PetCreate(BaseModel):
    id_dueño: UUID
    nombre_mascota: str
    id_especie: UUID
    id_raza: Optional[UUID] = None
    sexo_animal: str
    fecha_nacimiento: datetime.date
    color: str
    estado: str

pets = []

@router.get("/")
def list_pets():
    return {"mascotas": pets}

@router.post("/")
def create_pet(pet: PetCreate):
    new_pet = Pet(
        id_mascota=uuid4(),
        id_dueño=pet.id_dueño,
        nombre_mascota=pet.nombre_mascota,
        id_especie=pet.id_especie,
        id_raza=pet.id_raza,
        sexo_animal=pet.sexo_animal,
        fecha_nacimiento=pet.fecha_nacimiento,
        color=pet.color,
        estado=pet.estado,
        fecha_creacion=datetime.datetime.now(),
        fecha_actualizacion=datetime.datetime.now()
    )
    pets.append(new_pet)
    return {"mensaje": "Mascota creada correctamente", "pet": new_pet}

@router.get("/{pet_id}")
def get_pet(pet_id: UUID):
    for pet in pets:
        if pet.id_mascota == pet_id:
            return pet
    return {"error": "Mascota no encontrada"}

@router.put("/{pet_id}")
def update_pet(pet_id: UUID, pet_update: PetCreate):
    for i, pet in enumerate(pets):
        if pet.id_mascota == pet_id:
            pets[i] = Pet(
                id_mascota=pet_id,
                id_dueño=pet_update.id_dueño,
                nombre_mascota=pet_update.nombre_mascota,
                id_especie=pet_update.id_especie,
                id_raza=pet_update.id_raza,
                sexo_animal=pet_update.sexo_animal,
                fecha_nacimiento=pet_update.fecha_nacimiento,
                color=pet_update.color,
                estado=pet_update.estado,
                fecha_creacion=pet.fecha_creacion,
                fecha_actualizacion=datetime.datetime.now()
            )
            return {"mensaje": "Mascota actualizada", "pet": pets[i]}
    return {"error": "Mascota no encontrada"}

@router.delete("/{pet_id}")
def delete_pet(pet_id: UUID):
    for i, pet in enumerate(pets):
        if pet.id_mascota == pet_id:
            pets.pop(i)
            return {"mensaje": "Mascota eliminada"}
    return {"error": "Mascota no encontrada"}
