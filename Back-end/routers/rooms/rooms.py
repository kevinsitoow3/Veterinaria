from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from models.models import Room as RoomModel
from schemas import Room, RoomCreate

router = APIRouter(prefix="/rooms", tags=["Rooms"])

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
def get_room(room_id: int, db: Session = Depends(get_db)):
    room = db.query(RoomModel).filter(RoomModel.id_sala == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Sala no encontrada")
    return room

@router.put("/{room_id}")
def update_room(room_id: int, room_update: RoomCreate, db: Session = Depends(get_db)):
    room = db.query(RoomModel).filter(RoomModel.id_sala == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Sala no encontrada")
    
    room.nombre_sala = room_update.nombre_sala
    
    db.commit()
    db.refresh(room)
    return {"mensaje": "Sala actualizada", "room": room}

@router.delete("/{room_id}")
def delete_room(room_id: int, db: Session = Depends(get_db)):
    room = db.query(RoomModel).filter(RoomModel.id_sala == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Sala no encontrada")
    
    db.delete(room)
    db.commit()
    return {"mensaje": "Sala eliminada"}
