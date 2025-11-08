from decimal import Decimal
from uuid import UUID, uuid4
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/services", tags=["Services"])

class Service(BaseModel):
    id_servicio: UUID
    nombre_servicio: str
    descripcion_servicio: str
    precio_servicio: Decimal

class ServiceCreate(BaseModel):
    nombre_servicio: str
    descripcion_servicio: str
    precio_servicio: Decimal

services = []

@router.get("/")
def list_services():
    return {"servicios": services}

@router.post("/")
def create_service(service: ServiceCreate):
    new_service = Service(
        id_servicio=uuid4(),
        nombre_servicio=service.nombre_servicio,
        descripcion_servicio=service.descripcion_servicio,
        precio_servicio=service.precio_servicio
    )
    services.append(new_service)
    return {"mensaje": "Servicio creado correctamente", "service": new_service}

@router.get("/{service_id}")
def get_service(service_id: UUID):
    for service in services:
        if service.id_servicio == service_id:
            return service
    return {"error": "Servicio no encontrado"}

@router.put("/{service_id}")
def update_service(service_id: UUID, service_update: ServiceCreate):
    for i, service in enumerate(services):
        if service.id_servicio == service_id:
            services[i] = Service(
                id_servicio=service_id,
                nombre_servicio=service_update.nombre_servicio,
                descripcion_servicio=service_update.descripcion_servicio,
                precio_servicio=service_update.precio_servicio
            )
            return {"mensaje": "Servicio actualizado", "service": services[i]}
    return {"error": "Servicio no encontrado"}

@router.delete("/{service_id}")
def delete_service(service_id: UUID):
    for i, service in enumerate(services):
        if service.id_servicio == service_id:
            services.pop(i)
            return {"mensaje": "Servicio eliminado"}
    return {"error": "Servicio no encontrado"}

