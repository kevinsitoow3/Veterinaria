import datetime
from uuid import UUID, uuid4
from typing import Optional
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/quotes", tags=["Quotes"])

class Quote(BaseModel):
    id_cita: UUID
    id_mascota: UUID
    id_veterinario: UUID
    id_servicio: UUID
    id_sala: Optional[UUID] = None
    fecha_inicio: datetime.datetime
    fecha_fin: datetime.datetime
    estado_cita: str

class QuoteCreate(BaseModel):
    id_mascota: UUID
    id_veterinario: UUID
    id_servicio: UUID
    id_sala: Optional[UUID] = None
    fecha_inicio: datetime.datetime
    fecha_fin: datetime.datetime
    estado_cita: str

quotes = []

@router.get("/")
def list_quotes():
    return {"citas": quotes}

@router.post("/")
def create_quote(quote: QuoteCreate):
    new_quote = Quote(
        id_cita=uuid4(),
        id_mascota=quote.id_mascota,
        id_veterinario=quote.id_veterinario,
        id_servicio=quote.id_servicio,
        id_sala=quote.id_sala,
        fecha_inicio=quote.fecha_inicio,
        fecha_fin=quote.fecha_fin,
        estado_cita=quote.estado_cita
    )
    quotes.append(new_quote)
    return {"mensaje": "Cita creada correctamente", "quote": new_quote}

@router.get("/{quote_id}")
def get_quote(quote_id: UUID):
    for quote in quotes:
        if quote.id_cita == quote_id:
            return quote
    return {"error": "Cita no encontrada"}

@router.put("/{quote_id}")
def update_quote(quote_id: UUID, quote_update: QuoteCreate):
    for i, quote in enumerate(quotes):
        if quote.id_cita == quote_id:
            quotes[i] = Quote(
                id_cita=quote_id,
                id_mascota=quote_update.id_mascota,
                id_veterinario=quote_update.id_veterinario,
                id_servicio=quote_update.id_servicio,
                id_sala=quote_update.id_sala,
                fecha_inicio=quote_update.fecha_inicio,
                fecha_fin=quote_update.fecha_fin,
                estado_cita=quote_update.estado_cita
            )
            return {"mensaje": "Cita actualizada", "quote": quotes[i]}
    return {"error": "Cita no encontrada"}

@router.delete("/{quote_id}")
def delete_quote(quote_id: UUID):
    for i, quote in enumerate(quotes):
        if quote.id_cita == quote_id:
            quotes.pop(i)
            return {"mensaje": "Cita eliminada"}
    return {"error": "Cita no encontrada"}

