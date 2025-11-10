from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app_Vet.database.config.database import get_db
from app_Vet.database.models.models import Room as RoomModel

router = APIRouter(prefix="/rooms", tags=["Rooms"])

class Room(BaseModel):
    id_sala: str
    nombre_sala: str
    
    class Config:
        from_attributes = True

class RoomCreate(BaseModel):
    nombre_sala: str

@router.get("/")
def list_rooms(db: Session = Depends(get_db)):
    rooms = db.query(RoomModel).all()
    return {"salas": rooms}

@router.post("/")
def create_room(room: RoomCreate, db: Session = Depends(get_db)):
    db_room = RoomModel(
        nombre_sala=room.nombre_sala
    )
    db.add(db_room)
    db.commit()
    db.refresh(db_room)
    return {"mensaje": "Sala creada correctamente", "room": db_room}

@router.get("/{room_id}")
def get_room(room_id: str, db: Session = Depends(get_db)):
    room = db.query(RoomModel).filter(RoomModel.id_sala == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Sala no encontrada")
    return room

@router.put("/{room_id}")
def update_room(room_id: str, room_update: RoomCreate, db: Session = Depends(get_db)):
    room = db.query(RoomModel).filter(RoomModel.id_sala == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Sala no encontrada")
    
    room.nombre_sala = room_update.nombre_sala
    
    db.commit()
    db.refresh(room)
    return {"mensaje": "Sala actualizada", "room": room}

@router.delete("/{room_id}")
def delete_room(room_id: str, db: Session = Depends(get_db)):
    room = db.query(RoomModel).filter(RoomModel.id_sala == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Sala no encontrada")
    
    db.delete(room)
    db.commit()
    return {"mensaje": "Sala eliminada"}
