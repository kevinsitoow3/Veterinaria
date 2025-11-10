from sqlalchemy import Column, String, DateTime, Date, Boolean, Numeric, ForeignKey
from sqlalchemy.sql import func
import uuid

# Para SQLite, usamos String para UUID. Para PostgreSQL, usar: from sqlalchemy.dialects.postgresql import UUID
from app_Vet.database.config.database import Base

class Owner(Base):
    __tablename__ = "owners"
    
    id_dueño = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    nombre_dueño = Column(String, nullable=False)
    telefono_dueño = Column(String, nullable=False)
    correo_dueño = Column(String, nullable=False)
    direccion_dueño = Column(String, nullable=False)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Species(Base):
    __tablename__ = "species"
    
    id_especie = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    nombre_de_especie = Column(String, nullable=False)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Breed(Base):
    __tablename__ = "breeds"
    
    id_raza = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    id_especie = Column(String(36), ForeignKey("species.id_especie"), nullable=False)
    nombre_raza = Column(String, nullable=False)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Veterinarian(Base):
    __tablename__ = "veterinarians"
    
    id_veterinario = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    nombre_veterinario = Column(String, nullable=False)
    correo_veterinario = Column(String, nullable=False)
    telefono_veterinario = Column(String, nullable=False)
    especialidad_veterinario = Column(String, nullable=False)
    estado_veterinario = Column(Boolean, nullable=False, default=True)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Pet(Base):
    __tablename__ = "pets"
    
    id_mascota = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    id_dueño = Column(String(36), ForeignKey("owners.id_dueño"), nullable=False)
    nombre_mascota = Column(String, nullable=False)
    id_especie = Column(String(36), ForeignKey("species.id_especie"), nullable=False)
    id_raza = Column(String(36), ForeignKey("breeds.id_raza"), nullable=True)
    sexo_animal = Column(String, nullable=False)
    fecha_nacimiento = Column(Date, nullable=False)
    color = Column(String, nullable=False)
    estado = Column(String, nullable=False)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class Service(Base):
    __tablename__ = "services"
    
    id_servicio = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    nombre_servicio = Column(String, nullable=False)
    descripcion_servicio = Column(String, nullable=False)
    precio_servicio = Column(Numeric(10, 2), nullable=False)

class Room(Base):
    __tablename__ = "rooms"
    
    id_sala = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    nombre_sala = Column(String, nullable=False)

class Quote(Base):
    __tablename__ = "quotes"
    
    id_cita = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    id_mascota = Column(String(36), ForeignKey("pets.id_mascota"), nullable=False)
    id_veterinario = Column(String(36), ForeignKey("veterinarians.id_veterinario"), nullable=False)
    id_servicio = Column(String(36), ForeignKey("services.id_servicio"), nullable=False)
    id_sala = Column(String(36), ForeignKey("rooms.id_sala"), nullable=True)
    fecha_inicio = Column(DateTime(timezone=True), nullable=False)
    fecha_fin = Column(DateTime(timezone=True), nullable=False)
    estado_cita = Column(String, nullable=False)

class ClinicalHistory(Base):
    __tablename__ = "clinical_histories"
    
    id_historia = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    id_mascota = Column(String(36), ForeignKey("pets.id_mascota"), nullable=False)
    id_veterinario = Column(String(36), ForeignKey("veterinarians.id_veterinario"), nullable=False)
    id_cita = Column(String(36), ForeignKey("quotes.id_cita"), nullable=True)
    peso_kg_animal = Column(Numeric(10, 2), nullable=False)
    temperatura_animal = Column(Numeric(5, 2), nullable=False)
    sintomas = Column(String, nullable=False)
    diagnostico = Column(String, nullable=False)
    plan_tratamiento = Column(String, nullable=False)

class Treatment(Base):
    __tablename__ = "treatments"
    
    id_tratamiento = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    nombre_tratamiento = Column(String, nullable=False)
    descripcion_tratamiento = Column(String, nullable=False)
    precio_tratamiento = Column(Numeric(10, 2), nullable=False)

class AppliedTreatment(Base):
    __tablename__ = "applied_treatments"
    
    id_aplicacion = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    id_historia = Column(String(36), ForeignKey("clinical_histories.id_historia"), nullable=False)
    id_tratamiento = Column(String(36), ForeignKey("treatments.id_tratamiento"), nullable=False)
    cantidad = Column(Numeric(10, 2), nullable=False)
    precio_aplicado = Column(Numeric(10, 2), nullable=False)
    total = Column(Numeric(10, 2), nullable=False)
