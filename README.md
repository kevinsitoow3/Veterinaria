# 🐾 Sistema de Gestión Veterinaria

Sistema completo de gestión para clínicas veterinarias, desarrollado con FastAPI (Backend) y React (Frontend).

## 📋 Descripción

Sistema de gestión que permite administrar propietarios, mascotas, veterinarios, citas, historiales clínicos, tratamientos y servicios de una clínica veterinaria.

## 🏗️ Estructura del Proyecto

```
Veterinaria/
├── Back-end/          # API REST con FastAPI
│   ├── database/
│   │   ├── database.py      # Configuración de la base de datos
│   │   └── veterinary.sqlite # Base de datos SQLite
│   ├── models/              # Modelos SQLAlchemy
│   ├── routers/             # Endpoints de la API
│   ├── schemas/             # Schemas de Pydantic
│   ├── main.py              # Punto de entrada
│   └── requirements.txt     # Dependencias
│
└── Front-end/         # Interfaz de usuario con React
    ├── src/           # Código fuente
    ├── public/        # Archivos públicos
    └── package.json
```

## 🚀 Inicio Rápido

### Backend

1. Navega a la carpeta Back-end:
```bash
cd Back-end
```

2. Crea y activa un entorno virtual:
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```

3. Instala las dependencias:
```bash
pip install -r requirements.txt
```

4. Ejecuta el servidor:
```bash
uvicorn main:app --reload
```

El backend estará disponible en: `http://localhost:8000`

### Frontend

1. Navega a la carpeta Front-end:
```bash
cd Front-end
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta la aplicación:
```bash
npm start
```

El frontend estará disponible en: `http://localhost:3000`

## 📚 Documentación

Una vez que el backend esté corriendo, puedes acceder a:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔗 Endpoints Disponibles

- `/api/owners/` - Gestión de propietarios
- `/api/species/` - Gestión de especies
- `/api/breeds/` - Gestión de razas
- `/api/pets/` - Gestión de mascotas
- `/api/veterinarians/` - Gestión de veterinarios
- `/api/services/` - Gestión de servicios
- `/api/rooms/` - Gestión de salas
- `/api/quotes/` - Gestión de citas
- `/api/clinical-histories/` - Historiales clínicos
- `/api/treatments/` - Gestión de tratamientos
- `/api/applied-treatments/` - Tratamientos aplicados

## 🛠️ Tecnologías

### Backend
- **FastAPI** - Framework web moderno y rápido
- **Uvicorn** - Servidor ASGI
- **SQLAlchemy** - ORM para Python
- **Pydantic** - Validación de datos
- **SQLite** - Base de datos

### Frontend
- **React** - Biblioteca de JavaScript
- **Axios** - Cliente HTTP
- **CSS3** - Estilos modernos

## 📝 Licencia

Este proyecto es de uso privado.
