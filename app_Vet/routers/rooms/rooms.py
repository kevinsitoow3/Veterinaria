from uuid import UUID, uuid4
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/rooms", tags=["Rooms"])

class Room(BaseModel):
    id_sala: UUID
    nombre_sala: str

class RoomCreate(BaseModel):
    nombre_sala: str

rooms = []

@router.get("/")
def list_rooms():
    return {"salas": rooms}

@router.post("/")
def create_room(room: RoomCreate):
    new_room = Room(
        id_sala=uuid4(),
        nombre_sala=room.nombre_sala
    )
    rooms.append(new_room)
    return {"mensaje": "Sala creada correctamente", "room": new_room}

@router.get("/{room_id}")
def get_room(room_id: UUID):
    for room in rooms:
        if room.id_sala == room_id:
            return room
    return {"error": "Sala no encontrada"}

@router.put("/{room_id}")
def update_room(room_id: UUID, room_update: RoomCreate):
    for i, room in enumerate(rooms):
        if room.id_sala == room_id:
            rooms[i] = Room(
                id_sala=room_id,
                nombre_sala=room_update.nombre_sala
            )
            return {"mensaje": "Sala actualizada", "room": rooms[i]}
    return {"error": "Sala no encontrada"}

@router.delete("/{room_id}")
def delete_room(room_id: UUID):
    for i, room in enumerate(rooms):
        if room.id_sala == room_id:
            rooms.pop(i)
            return {"mensaje": "Sala eliminada"}
    return {"error": "Sala no encontrada"}

