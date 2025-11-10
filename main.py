from fastapi import FastAPI
from app_Vet.database.config.database import engine, Base
# Importar todos los modelos para que se registren en Base.metadata
from app_Vet.database.models import models
from app_Vet.routers.owners import router as owners_router
from app_Vet.routers.species import router as species_router
from app_Vet.routers.breeds import router as breeds_router
from app_Vet.routers.pets import router as pets_router
from app_Vet.routers.veterinarians import router as veterinarians_router
from app_Vet.routers.services import router as services_router
from app_Vet.routers.rooms import router as rooms_router
from app_Vet.routers.quotes import router as quotes_router
from app_Vet.routers.clinical_histories import router as clinical_histories_router
from app_Vet.routers.treatments import router as treatments_router
from app_Vet.routers.applied_treatments import router as applied_treatments_router

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Veterinaria API",
    version="1.0.0",
)

@app.get("/")
def root():
    return {
        "message": "Bienvenido a la API de Veterinaria",
        "version": "1.0.0",
        "documentation": {
            "swagger": "/docs",
            "redoc": "/redoc"
        },
        "endpoints": {
            "owners": "/api/owners/",
            "species": "/api/species/",
            "breeds": "/api/breeds/",
            "pets": "/api/pets/",
            "veterinarians": "/api/veterinarians/",
            "services": "/api/services/",
            "rooms": "/api/rooms/",
            "quotes": "/api/quotes/",
            "clinical_histories": "/api/clinical-histories/",
            "treatments": "/api/treatments/",
            "applied_treatments": "/api/applied-treatments/"
        }
    }

API_PREFIX = "/api"
app.include_router(owners_router, prefix=API_PREFIX)
app.include_router(species_router, prefix=API_PREFIX)
app.include_router(breeds_router, prefix=API_PREFIX)
app.include_router(pets_router, prefix=API_PREFIX)
app.include_router(veterinarians_router, prefix=API_PREFIX)
app.include_router(services_router, prefix=API_PREFIX)
app.include_router(rooms_router, prefix=API_PREFIX)
app.include_router(quotes_router, prefix=API_PREFIX)
app.include_router(clinical_histories_router, prefix=API_PREFIX)
app.include_router(treatments_router, prefix=API_PREFIX)
app.include_router(applied_treatments_router, prefix=API_PREFIX)