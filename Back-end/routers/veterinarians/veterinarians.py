from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from models.models import Veterinarian as VeterinarianModel
from schemas import Veterinarian, VeterinarianCreate

router = APIRouter(prefix="/veterinarians", tags=["Veterinarians"])

@router.get("/")
def list_veterinarians(db: Session = Depends(get_db)):
    veterinarians = db.query(VeterinarianModel).all()
    return {"veterinarios": veterinarians}

@router.post("/")
def create_veterinarian(veterinarian: VeterinarianCreate, db: Session = Depends(get_db)):
    db_veterinarian = VeterinarianModel(
        nombre_veterinario=veterinarian.nombre_veterinario,
        correo_veterinario=veterinarian.correo_veterinario,
        telefono_veterinario=veterinarian.telefono_veterinario,
        especialidad_veterinario=veterinarian.especialidad_veterinario,
        estado_veterinario=veterinarian.estado_veterinario
    )
    db.add(db_veterinarian)
    db.commit()
    db.refresh(db_veterinarian)
    return {"mensaje": "Veterinario creado correctamente", "veterinarian": db_veterinarian}

@router.get("/{veterinarian_id}")
def get_veterinarian(veterinarian_id: int, db: Session = Depends(get_db)):
    veterinarian = db.query(VeterinarianModel).filter(VeterinarianModel.id_veterinario == veterinarian_id).first()
    if not veterinarian:
        raise HTTPException(status_code=404, detail="Veterinario no encontrado")
    return veterinarian

@router.put("/{veterinarian_id}")
def update_veterinarian(veterinarian_id: int, veterinarian_update: VeterinarianCreate, db: Session = Depends(get_db)):
    veterinarian = db.query(VeterinarianModel).filter(VeterinarianModel.id_veterinario == veterinarian_id).first()
    if not veterinarian:
        raise HTTPException(status_code=404, detail="Veterinario no encontrado")
    
    veterinarian.nombre_veterinario = veterinarian_update.nombre_veterinario
    veterinarian.correo_veterinario = veterinarian_update.correo_veterinario
    veterinarian.telefono_veterinario = veterinarian_update.telefono_veterinario
    veterinarian.especialidad_veterinario = veterinarian_update.especialidad_veterinario
    veterinarian.estado_veterinario = veterinarian_update.estado_veterinario
    
    db.commit()
    db.refresh(veterinarian)
    return {"mensaje": "Veterinario actualizado", "veterinarian": veterinarian}

@router.delete("/{veterinarian_id}")
def delete_veterinarian(veterinarian_id: int, db: Session = Depends(get_db)):
    veterinarian = db.query(VeterinarianModel).filter(VeterinarianModel.id_veterinario == veterinarian_id).first()
    if not veterinarian:
        raise HTTPException(status_code=404, detail="Veterinario no encontrado")
    
    db.delete(veterinarian)
    db.commit()
    return {"mensaje": "Veterinario eliminado"}
