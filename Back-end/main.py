from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.database import engine, Base
# Importar todos los modelos para que se registren en Base.metadata
from models import models
from routers.owners import router as owners_router
from routers.species import router as species_router
from routers.breeds import router as breeds_router
from routers.pets import router as pets_router
from routers.veterinarians import router as veterinarians_router
from routers.services import router as services_router
from routers.rooms import router as rooms_router
from routers.quotes import router as quotes_router
from routers.clinical_histories import router as clinical_histories_router
from routers.treatments import router as treatments_router
from routers.applied_treatments import router as applied_treatments_router

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Veterinaria API",
    version="1.0.0",
)

# Configurar CORS para permitir conexiones desde React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Puerto por defecto de React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)