import datetime
from uuid import UUID, uuid4
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/species", tags=["Species"])

class Species(BaseModel):
    id_especie: UUID
    nombre_de_especie: str
    fecha_creacion: datetime.datetime
    fecha_actualizacion: datetime.datetime

class SpeciesCreate(BaseModel):
    nombre_de_especie: str

species = []

@router.get("/")
def list_species():
    return {"especies": species}

@router.post("/")
def create_species(specie: SpeciesCreate):
    new_species = Species(
        id_especie=uuid4(),
        nombre_de_especie=specie.nombre_de_especie,
        fecha_creacion=datetime.datetime.now(),
        fecha_actualizacion=datetime.datetime.now()
    )
    species.append(new_species)
    return {"mensaje": "Especie creada correctamente", "species": new_species}

@router.get("/{species_id}")
def get_species(species_id: UUID):
    for s in species:
        if s.id_especie == species_id:
            return s
    return {"error": "Especie no encontrada"}

@router.put("/{species_id}")
def update_species(species_id: UUID, species_update: SpeciesCreate):
    for i, s in enumerate(species):
        if s.id_especie == species_id:
            species[i] = Species(
                id_especie=species_id,
                nombre_de_especie=species_update.nombre_de_especie,
                fecha_creacion=s.fecha_creacion,
                fecha_actualizacion=datetime.datetime.now()
            )
            return {"mensaje": "Especie actualizada", "species": species[i]}
    return {"error": "Especie no encontrada"}

@router.delete("/{species_id}")
def delete_species(species_id: UUID):
    for i, s in enumerate(species):
        if s.id_especie == species_id:
            species.pop(i)
            return {"mensaje": "Especie eliminada"}
    return {"error": "Especie no encontrada"}

