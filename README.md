# 🐾 API Veterinaria

API REST desarrollada con FastAPI para la gestión de una clínica veterinaria.

## 📋 Descripción

Sistema de gestión que permite administrar propietarios, mascotas, veterinarios, citas, historiales clínicos, tratamientos y servicios de una clínica veterinaria.

## 🚀 Requisitos

- Python 3.8 o superior
- pip

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd Veterinaria
```

2. Crea un entorno virtual:
```bash
python -m venv venv
```

3. Activa el entorno virtual:
- Windows:
```bash
venv\Scripts\activate
```
- Linux/Mac:
```bash
source venv/bin/activate
```

4. Instala las dependencias:
```bash
pip install -r requirements.txt
```

## ▶️ Uso

Para ejecutar el servidor de desarrollo:

```bash
uvicorn main:app --reload
```

La API estará disponible en: `http://localhost:8000`

## 📚 Documentación

Una vez que el servidor esté corriendo, puedes acceder a:

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

- **FastAPI** - Framework web moderno y rápido
- **Uvicorn** - Servidor ASGI
- **Pydantic** - Validación de datos

## 📝 Licencia

Este proyecto es de uso privado.

