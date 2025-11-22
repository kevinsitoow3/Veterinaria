from pydantic import BaseModel
from datetime import datetime, date
from decimal import Decimal


# ==================== ROOMS SCHEMAS ====================
class RoomBase(BaseModel):
    nombre_sala: str


class RoomCreate(RoomBase):
    pass


class Room(RoomBase):
    id_sala: int
    
    class Config:
        from_attributes = True


# ==================== SERVICES SCHEMAS ====================
class ServiceBase(BaseModel):
    nombre_servicio: str
    descripcion_servicio: str
    precio_servicio: Decimal


class ServiceCreate(ServiceBase):
    pass


class Service(ServiceBase):
    id_servicio: int
    
    class Config:
        from_attributes = True


# ==================== TREATMENTS SCHEMAS ====================
class TreatmentBase(BaseModel):
    nombre_tratamiento: str
    descripcion_tratamiento: str
    precio_tratamiento: Decimal


class TreatmentCreate(TreatmentBase):
    pass


class Treatment(TreatmentBase):
    id_tratamiento: int
    
    class Config:
        from_attributes = True


# ==================== APPLIED TREATMENTS SCHEMAS ====================
class AppliedTreatmentBase(BaseModel):
    id_historia: int
    id_tratamiento: int
    cantidad: Decimal
    precio_aplicado: Decimal
    total: Decimal


class AppliedTreatmentCreate(AppliedTreatmentBase):
    pass


class AppliedTreatment(AppliedTreatmentBase):
    id_aplicacion: int
    
    class Config:
        from_attributes = True


# ==================== QUOTES SCHEMAS ====================
class QuoteBase(BaseModel):
    id_mascota: int
    id_veterinario: int
    id_servicio: int
    id_sala: int
    fecha_inicio: datetime
    fecha_fin: datetime
    estado_cita: str


class QuoteCreate(QuoteBase):
    pass


class Quote(QuoteBase):
    id_cita: int
    
    class Config:
        from_attributes = True


# ==================== CLINICAL HISTORIES SCHEMAS ====================
class ClinicalHistoryBase(BaseModel):
    id_mascota: int
    id_veterinario: int
    id_cita: int
    peso_kg_animal: Decimal
    temperatura_animal: Decimal
    sintomas: str
    diagnostico: str
    plan_tratamiento: str


class ClinicalHistoryCreate(ClinicalHistoryBase):
    pass


class ClinicalHistory(ClinicalHistoryBase):
    id_historia: int
    
    class Config:
        from_attributes = True


# ==================== OWNERS SCHEMAS ====================
class OwnerBase(BaseModel):
    nombre_dueño: str
    telefono_dueño: str
    correo_dueño: str
    direccion_dueño: str


class OwnerCreate(OwnerBase):
    pass


class Owner(OwnerBase):
    id_dueño: int
    fecha_creacion: datetime
    fecha_actualizacion: datetime
    
    class Config:
        from_attributes = True


# ==================== VETERINARIANS SCHEMAS ====================
class VeterinarianBase(BaseModel):
    nombre_veterinario: str
    correo_veterinario: str
    telefono_veterinario: str
    especialidad_veterinario: str
    estado_veterinario: bool


class VeterinarianCreate(VeterinarianBase):
    pass


class Veterinarian(VeterinarianBase):
    id_veterinario: int
    fecha_creacion: datetime
    fecha_actualizacion: datetime
    
    class Config:
        from_attributes = True


# ==================== PETS SCHEMAS ====================
class PetBase(BaseModel):
    id_dueño: int
    nombre_mascota: str
    id_especie: int
    id_raza: int
    sexo_animal: str
    fecha_nacimiento: date
    color: str
    estado: str


class PetCreate(PetBase):
    pass


class Pet(PetBase):
    id_mascota: int
    fecha_creacion: datetime
    fecha_actualizacion: datetime
    
    class Config:
        from_attributes = True


# ==================== SPECIES SCHEMAS ====================
class SpeciesBase(BaseModel):
    nombre_de_especie: str


class SpeciesCreate(SpeciesBase):
    pass


class Species(SpeciesBase):
    id_especie: int
    fecha_creacion: datetime
    fecha_actualizacion: datetime
    
    class Config:
        from_attributes = True


# ==================== BREEDS SCHEMAS ====================
class BreedBase(BaseModel):
    id_especie: int
    nombre_raza: str


class BreedCreate(BreedBase):
    pass


class Breed(BreedBase):
    id_raza: int
    fecha_creacion: datetime
    fecha_actualizacion: datetime
    
    class Config:
        from_attributes = True
