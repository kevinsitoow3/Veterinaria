from sqlalchemy import Column, String, DateTime, Date, Boolean, Numeric, ForeignKey, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database.database import Base


class Room(Base):
    __tablename__ = "rooms"
    
    id_sala = Column(Integer, primary_key=True, autoincrement=True)
    nombre_sala = Column(String(60), nullable=False)
    
    # Relationships
    quotes = relationship("Quote", back_populates="room")


class Service(Base):
    __tablename__ = "services"
    
    id_servicio = Column(Integer, primary_key=True, autoincrement=True)
    nombre_servicio = Column(String(150), nullable=False)
    descripcion_servicio = Column(String(100), nullable=False)
    precio_servicio = Column(Numeric(10, 2), nullable=False)
    
    # Relationships
    quotes = relationship("Quote", back_populates="service")


class Treatment(Base):
    __tablename__ = "treatments"
    
    id_tratamiento = Column(Integer, primary_key=True, autoincrement=True)
    nombre_tratamiento = Column(String(120), nullable=False)
    descripcion_tratamiento = Column(String(10000), nullable=False)
    precio_tratamiento = Column(Numeric(10, 2), nullable=False)
    
    # Relationships
    applied_treatments = relationship("AppliedTreatment", back_populates="treatment")


class AppliedTreatment(Base):
    __tablename__ = "applied_treatments"
    
    id_aplicacion = Column(Integer, primary_key=True, autoincrement=True)
    id_historia = Column(Integer, ForeignKey("clinical_histories.id_historia"), nullable=False)
    id_tratamiento = Column(Integer, ForeignKey("treatments.id_tratamiento"), nullable=False)
    cantidad = Column(Numeric(10, 2), nullable=False)
    precio_aplicado = Column(Numeric(10, 2), nullable=False)
    total = Column(Numeric(12, 2), nullable=False)
    
    # Relationships
    clinical_history = relationship("ClinicalHistory", back_populates="applied_treatments")
    treatment = relationship("Treatment", back_populates="applied_treatments")


class Quote(Base):
    __tablename__ = "quotes"
    
    id_cita = Column(Integer, primary_key=True, autoincrement=True)
    id_mascota = Column(Integer, ForeignKey("pets.id_mascota"), nullable=False)
    id_veterinario = Column(Integer, ForeignKey("veterinarians.id_veterinario"), nullable=False)
    id_servicio = Column(Integer, ForeignKey("services.id_servicio"), nullable=False)
    id_sala = Column(Integer, ForeignKey("rooms.id_sala"), nullable=False)
    fecha_inicio = Column(DateTime(timezone=True), nullable=False)
    fecha_fin = Column(DateTime(timezone=True), nullable=False)
    estado_cita = Column(String(25), nullable=False)
    
    # Relationships
    pet = relationship("Pet", back_populates="quotes")
    veterinarian = relationship("Veterinarian", back_populates="quotes")
    service = relationship("Service", back_populates="quotes")
    room = relationship("Room", back_populates="quotes")
    clinical_history = relationship("ClinicalHistory", back_populates="quote", uselist=False)


class ClinicalHistory(Base):
    __tablename__ = "clinical_histories"
    
    id_historia = Column(Integer, primary_key=True, autoincrement=True)
    id_mascota = Column(Integer, ForeignKey("pets.id_mascota"), nullable=False)
    id_veterinario = Column(Integer, ForeignKey("veterinarians.id_veterinario"), nullable=False)
    id_cita = Column(Integer, ForeignKey("quotes.id_cita"), nullable=False)
    peso_kg_animal = Column(Numeric(5, 2), nullable=False)
    temperatura_animal = Column(Numeric(4, 1), nullable=False)
    sintomas = Column(String(10000), nullable=False)
    diagnostico = Column(String(10000), nullable=False)
    plan_tratamiento = Column(String(10000), nullable=False)
    
    # Relationships
    pet = relationship("Pet", back_populates="clinical_histories")
    veterinarian = relationship("Veterinarian", back_populates="clinical_histories")
    quote = relationship("Quote", back_populates="clinical_history")
    applied_treatments = relationship("AppliedTreatment", back_populates="clinical_history")


class Owner(Base):
    __tablename__ = "owners"
    
    id_dueño = Column(Integer, primary_key=True, autoincrement=True)
    nombre_dueño = Column(String(150), nullable=False)
    telefono_dueño = Column(String(30), nullable=False)
    correo_dueño = Column(String(150), nullable=False)
    direccion_dueño = Column(String(150), nullable=False)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    pets = relationship("Pet", back_populates="owner")


class Veterinarian(Base):
    __tablename__ = "veterinarians"
    
    id_veterinario = Column(Integer, primary_key=True, autoincrement=True)
    nombre_veterinario = Column(String(150), nullable=False)
    correo_veterinario = Column(String(150), nullable=False)
    telefono_veterinario = Column(String(30), nullable=False)
    especialidad_veterinario = Column(String(30), nullable=False)
    estado_veterinario = Column(Boolean, nullable=False)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    quotes = relationship("Quote", back_populates="veterinarian")
    clinical_histories = relationship("ClinicalHistory", back_populates="veterinarian")


class Pet(Base):
    __tablename__ = "pets"
    
    id_mascota = Column(Integer, primary_key=True, autoincrement=True)
    id_dueño = Column(Integer, ForeignKey("owners.id_dueño"), nullable=False)
    nombre_mascota = Column(String(100), nullable=False)
    id_especie = Column(Integer, ForeignKey("species.id_especie"), nullable=False)
    id_raza = Column(Integer, ForeignKey("breeds.id_raza"), nullable=False)
    sexo_animal = Column(String(10), nullable=False)
    fecha_nacimiento = Column(Date, nullable=False)
    color = Column(String(60), nullable=False)
    estado = Column(String(100), nullable=False)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    owner = relationship("Owner", back_populates="pets")
    species = relationship("Species", back_populates="pets")
    breed = relationship("Breed", back_populates="pets")
    quotes = relationship("Quote", back_populates="pet")
    clinical_histories = relationship("ClinicalHistory", back_populates="pet")


class Species(Base):
    __tablename__ = "species"
    
    id_especie = Column(Integer, primary_key=True, autoincrement=True)
    nombre_de_especie = Column(String(80), nullable=False)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    breeds = relationship("Breed", back_populates="species")
    pets = relationship("Pet", back_populates="species")


class Breed(Base):
    __tablename__ = "breeds"
    
    id_raza = Column(Integer, primary_key=True, autoincrement=True)
    id_especie = Column(Integer, ForeignKey("species.id_especie"), nullable=False)
    nombre_raza = Column(String(80), nullable=False)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    species = relationship("Species", back_populates="breeds")
    pets = relationship("Pet", back_populates="breed")
