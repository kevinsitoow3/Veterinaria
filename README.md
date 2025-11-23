# 🐾 Sistema de Gestión Veterinaria

Sistema completo de gestión para clínicas veterinarias, desarrollado con **FastAPI** (Backend) y **React + Vite** (Frontend).

## 📋 Descripción

Sistema de gestión integral que permite administrar todas las operaciones de una clínica veterinaria, incluyendo propietarios, mascotas, veterinarios, citas, historiales clínicos, tratamientos y servicios. El sistema cuenta con validaciones completas de formularios, interfaz moderna y funcionalidades CRUD para todas las entidades.

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
└── Front-end/         # Interfaz de usuario con React + Vite
    ├── src/
    │   ├── components/    # Componentes React (presentación)
    │   ├── hooks/         # Custom hooks (lógica de negocio)
    │   ├── services/      # Servicios API (comunicación con backend)
    │   ├── styles/        # Archivos CSS por componente
    │   ├── utils/         # Utilidades (validaciones, formateo)
    │   ├── App.jsx        # Componente principal
    │   └── main.jsx       # Punto de entrada
    ├── public/            # Archivos públicos (favicon, etc.)
    ├── package.json
    └── vite.config.js
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

3. Ejecuta la aplicación en modo desarrollo:
```bash
npm run dev
```

El frontend estará disponible en: `http://localhost:3000` (puerto por defecto de Vite)

**Nota:** Asegúrate de actualizar la configuración CORS en `Back-end/main.py` si usas un puerto diferente.

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

## ✨ Características Principales

### Funcionalidades CRUD
- ✅ Gestión completa de **Propietarios** (Dueños)
- ✅ Gestión de **Especies** y **Razas**
- ✅ Gestión de **Mascotas** con estados predefinidos
- ✅ Gestión de **Veterinarios** con estado activo/inactivo
- ✅ Gestión de **Servicios** con precios mínimos
- ✅ Gestión de **Salas**
- ✅ Gestión de **Citas** con validación de veterinarios activos
- ✅ **Historiales Clínicos** con auto-completado desde citas
- ✅ Gestión de **Tratamientos** y **Tratamientos Aplicados**

### Validaciones Implementadas
- ✅ Validación de nombres (solo letras)
- ✅ Validación de teléfonos (solo números y caracteres especiales)
- ✅ Validación de emails (formato correcto)
- ✅ Validación de fechas (no futuras para nacimientos)
- ✅ Validación de precios (rangos mínimos según entidad)
- ✅ Validación de estados predefinidos (mascotas, citas)
- ✅ Validación de veterinarios activos para citas
- ✅ Validación de fechas de citas (fecha fin después de inicio)

### Características de UX
- ✅ Formateo de números con separador de miles (1.000, 10.000, etc.)
- ✅ Auto-completado de veterinario al seleccionar cita
- ✅ Cálculo automático de totales en tratamientos aplicados
- ✅ Interfaz moderna y responsive
- ✅ Validación en tiempo real
- ✅ Mensajes de error claros y descriptivos

## 🛠️ Tecnologías

### Backend
- **FastAPI** - Framework web moderno y rápido
- **Uvicorn** - Servidor ASGI
- **SQLAlchemy** - ORM para Python
- **Pydantic** - Validación de datos y schemas
- **SQLite** - Base de datos relacional

### Frontend
- **React 18** - Biblioteca de JavaScript para interfaces
- **Vite** - Build tool y servidor de desarrollo
- **Axios** - Cliente HTTP para comunicación con API
- **CSS3** - Estilos modernos y modulares
- **Custom Hooks** - Separación de lógica y presentación
- **Validaciones personalizadas** - Sistema de validación reutilizable

## 🏗️ Arquitectura del Frontend

El frontend sigue una arquitectura modular:

- **Components/**: Componentes React puramente presentacionales
- **Hooks/**: Custom hooks que encapsulan la lógica de negocio y estado
- **Services/**: Servicios API centralizados para comunicación con el backend
- **Utils/**: Funciones utilitarias (validaciones, formateo de números)
- **Styles/**: Archivos CSS organizados por componente

Esta separación permite:
- Mantenibilidad del código
- Reutilización de lógica
- Fácil testing
- Escalabilidad

## 📊 Entidades del Sistema

1. **Owners (Dueños)**: Información de los propietarios de las mascotas
2. **Species (Especies)**: Catálogo de especies animales
3. **Breeds (Razas)**: Razas asociadas a especies
4. **Pets (Mascotas)**: Registro de mascotas con estados predefinidos
5. **Veterinarians (Veterinarios)**: Personal veterinario con estado activo/inactivo
6. **Services (Servicios)**: Servicios ofrecidos por la clínica
7. **Rooms (Salas)**: Salas disponibles para citas
8. **Quotes (Citas)**: Citas programadas con validaciones
9. **Clinical Histories (Historiales)**: Historiales clínicos de las mascotas
10. **Treatments (Tratamientos)**: Catálogo de tratamientos disponibles
11. **Applied Treatments**: Tratamientos aplicados a historiales específicos

## 🔒 Validaciones Específicas

### Propietarios
- Nombre: Solo letras y espacios
- Teléfono: Solo números, espacios, guiones, paréntesis y "+"
- Email: Formato de email válido
- Dirección: Mínimo 5 caracteres

### Mascotas
- Nombre: Solo letras y espacios
- Estado: Valores predefinidos (Saludable, En tratamiento, etc.)
- Fecha de nacimiento: No puede ser futura
- Color: Solo letras y espacios

### Veterinarios
- Nombre: Solo letras y espacios
- Estado: Activo/Inactivo (checkbox)
- Especialidad: Solo letras y espacios

### Servicios
- Precio: Mayor o igual a 20.000
- Nombre: Mínimo 3 caracteres

### Tratamientos
- Precio: Mayor o igual a 100
- Nombre: Solo letras, mínimo 3 caracteres
- Descripción: Solo letras y signos de puntuación, mínimo 10 caracteres

### Citas
- Solo se pueden crear con veterinarios activos
- Fecha de fin debe ser posterior a fecha de inicio
- Estado: Valores predefinidos (Programada, Confirmada, etc.)

## 🚀 Scripts Disponibles

### Backend
```bash
# Ejecutar servidor de desarrollo
uvicorn main:app --reload

# Ejecutar servidor en puerto específico
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📝 Notas de Desarrollo

- El backend usa SQLite como base de datos por defecto
- El frontend usa Vite como build tool (más rápido que Create React App)
- Las validaciones se realizan tanto en frontend como en backend
- El sistema de formateo de números usa punto (.) como separador de miles
- Los precios se muestran sin decimales en la interfaz

## 📝 Licencia

Este proyecto es de uso privado.
