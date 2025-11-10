from decimal import Decimal
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app_Vet.database.config.database import get_db
from app_Vet.database.models.models import Service as ServiceModel

router = APIRouter(prefix="/services", tags=["Services"])

class Service(BaseModel):
    id_servicio: str
    nombre_servicio: str
    descripcion_servicio: str
    precio_servicio: Decimal
    
    class Config:
        from_attributes = True

class ServiceCreate(BaseModel):
    nombre_servicio: str
    descripcion_servicio: str
    precio_servicio: Decimal

@router.get("/")
def list_services(db: Session = Depends(get_db)):
    services = db.query(ServiceModel).all()
    return {"servicios": services}

@router.post("/")
def create_service(service: ServiceCreate, db: Session = Depends(get_db)):
    db_service = ServiceModel(
        nombre_servicio=service.nombre_servicio,
        descripcion_servicio=service.descripcion_servicio,
        precio_servicio=service.precio_servicio
    )
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return {"mensaje": "Servicio creado correctamente", "service": db_service}

@router.get("/{service_id}")
def get_service(service_id: str, db: Session = Depends(get_db)):
    service = db.query(ServiceModel).filter(ServiceModel.id_servicio == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")
    return service

@router.put("/{service_id}")
def update_service(service_id: str, service_update: ServiceCreate, db: Session = Depends(get_db)):
    service = db.query(ServiceModel).filter(ServiceModel.id_servicio == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")
    
    service.nombre_servicio = service_update.nombre_servicio
    service.descripcion_servicio = service_update.descripcion_servicio
    service.precio_servicio = service_update.precio_servicio
    
    db.commit()
    db.refresh(service)
    return {"mensaje": "Servicio actualizado", "service": service}

@router.delete("/{service_id}")
def delete_service(service_id: str, db: Session = Depends(get_db)):
    service = db.query(ServiceModel).filter(ServiceModel.id_servicio == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")
    
    db.delete(service)
    db.commit()
    return {"mensaje": "Servicio eliminado"}
