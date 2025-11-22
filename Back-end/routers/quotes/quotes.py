from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from models.models import Quote as QuoteModel
from schemas import Quote, QuoteCreate

router = APIRouter(prefix="/quotes", tags=["Quotes"])

@router.get("/")
def list_quotes(db: Session = Depends(get_db)):
    quotes = db.query(QuoteModel).all()
    return {"citas": quotes}

@router.post("/")
def create_quote(quote: QuoteCreate, db: Session = Depends(get_db)):
    db_quote = QuoteModel(
        id_mascota=quote.id_mascota,
        id_veterinario=quote.id_veterinario,
        id_servicio=quote.id_servicio,
        id_sala=quote.id_sala,
        fecha_inicio=quote.fecha_inicio,
        fecha_fin=quote.fecha_fin,
        estado_cita=quote.estado_cita
    )
    db.add(db_quote)
    db.commit()
    db.refresh(db_quote)
    return {"mensaje": "Cita creada correctamente", "quote": db_quote}

@router.get("/{quote_id}")
def get_quote(quote_id: int, db: Session = Depends(get_db)):
    quote = db.query(QuoteModel).filter(QuoteModel.id_cita == quote_id).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Cita no encontrada")
    return quote

@router.put("/{quote_id}")
def update_quote(quote_id: int, quote_update: QuoteCreate, db: Session = Depends(get_db)):
    quote = db.query(QuoteModel).filter(QuoteModel.id_cita == quote_id).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Cita no encontrada")
    
    quote.id_mascota = quote_update.id_mascota
    quote.id_veterinario = quote_update.id_veterinario
    quote.id_servicio = quote_update.id_servicio
    quote.id_sala = quote_update.id_sala
    quote.fecha_inicio = quote_update.fecha_inicio
    quote.fecha_fin = quote_update.fecha_fin
    quote.estado_cita = quote_update.estado_cita
    
    db.commit()
    db.refresh(quote)
    return {"mensaje": "Cita actualizada", "quote": quote}

@router.delete("/{quote_id}")
def delete_quote(quote_id: int, db: Session = Depends(get_db)):
    quote = db.query(QuoteModel).filter(QuoteModel.id_cita == quote_id).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Cita no encontrada")
    
    db.delete(quote)
    db.commit()
    return {"mensaje": "Cita eliminada"}
