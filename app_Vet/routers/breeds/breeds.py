import datetime
from uuid import UUID, uuid4
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/breeds", tags=["Breeds"])

class Breed(BaseModel):
    id_raza: UUID
    id_especie: UUID
    nombre_raza: str
    fecha_creacion: datetime.datetime
    fecha_actualizacion: datetime.datetime

class BreedCreate(BaseModel):
    id_especie: UUID
    nombre_raza: str

breeds = []

@router.get("/")
def list_breeds():
    return {"razas": breeds}

@router.post("/")
def create_breed(breed: BreedCreate):
    new_breed = Breed(
        id_raza=uuid4(),
        id_especie=breed.id_especie,
        nombre_raza=breed.nombre_raza,
        fecha_creacion=datetime.datetime.now(),
        fecha_actualizacion=datetime.datetime.now()
    )
    breeds.append(new_breed)
    return {"mensaje": "Raza creada correctamente", "breed": new_breed}

@router.get("/{breed_id}")
def get_breed(breed_id: UUID):
    for breed in breeds:
        if breed.id_raza == breed_id:
            return breed
    return {"error": "Raza no encontrada"}

@router.put("/{breed_id}")
def update_breed(breed_id: UUID, breed_update: BreedCreate):
    for i, breed in enumerate(breeds):
        if breed.id_raza == breed_id:
            breeds[i] = Breed(
                id_raza=breed_id,
                id_especie=breed_update.id_especie,
                nombre_raza=breed_update.nombre_raza,
                fecha_creacion=breed.fecha_creacion,
                fecha_actualizacion=datetime.datetime.now()
            )
            return {"mensaje": "Raza actualizada", "breed": breeds[i]}
    return {"error": "Raza no encontrada"}

@router.delete("/{breed_id}")
def delete_breed(breed_id: UUID):
    for i, breed in enumerate(breeds):
        if breed.id_raza == breed_id:
            breeds.pop(i)
            return {"mensaje": "Raza eliminada"}
    return {"error": "Raza no encontrada"}

