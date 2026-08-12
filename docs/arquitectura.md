# Arquitectura del Sistema

Diagrama de Arquitectura: El sistema sigue un patrón de arquitectura multicapa clásico de 3 capas, contenerizado e integrado completamente mediante Docker Compose.

+-------------------------------------------------------------------+
|                        USUARIO FINAL (Navegador)                   |
+-------------------------------------------------------------------+
                                  |
                                  | HTTP / JSON (Puerto 5173 / 80)
                                  v
+-------------------------------------------------------------------+
|                     FRONTEND (React + Vite + TS)                  |
|  - Renderizado de Vistas (Listado, Formularios, Dashboard)        |
|  - Estado de Interfaz y Consumo de API REST con Fetch/Axios       |
+-------------------------------------------------------------------+
                                  |
                                  | HTTP / REST API (Puerto 8080)
                                  v
+-------------------------------------------------------------------+
|                BACKEND (Java 21 + Spring Boot 4.x)                |
|  - Controller: Exposición de Endpoints REST                       |
|  - Service: Lógica de Negocio y Reglas                            |
|  - Repository: Abstracción de Persistencia (Spring Data JPA)      |
+-------------------------------------------------------------------+
                                  |
                                  | JDBC / TCP (Puerto 5432 / 3306)
                                  v
+-------------------------------------------------------------------+
|               BASE DE DATOS RELACIONAL (PostgreSQL)                |
|  - Almacenamiento Persistente en Volumen Docker                   |
+-------------------------------------------------------------------+


# Diagrama de Secuencia General en Mermaid

sequenceDiagram
    autonumber
    actor Usuario
    participant FE as Frontend (React)
    participant BE as Backend (Spring Boot)
    participant DB as Base de Datos (PostgreSQL)

    Usuario->>FE: Completa formulario y presiona "Guardar"
    FE->>BE: POST /api/incidencias (JSON)
    BE->>BE: Valida campos requeridos (RN-02)
    BE->>BE: Asigna estado inicial ABIERTA (RN-01)
    BE->>DB: INSERT INTO incidencias (...)
    DB-->>BE: Confirmación de inserción + ID generado
    BE-->>FE: HTTP 201 Created + Incidencia JSON
    FE-->>Usuario: Muestra mensaje de éxito y actualiza listado

# Responsabilidades de los Componentes
## Frontend (React + Vite)
Presentación: Renderizar una interfaz intuitiva para operar las incidencias.

Gestión de Estado: Manejar el estado local de la interfaz (filtros activos, incidencias seleccionadas, modales de edición).

Consumo de API: Realizar peticiones HTTP asíncronas (GET, POST, PUT, DELETE) hacia el backend.

Validación de experiencia: Validar que los campos no se envíen vacíos antes de realizar la petición HTTP.

## Backend (Spring Boot)
Endpoints REST: Exponer los servicios HTTP cumpliendo la semántica RESTful.

Reglas de Negocio: Garantizar que los estados iniciales y validaciones de dominio se cumplan obligatoriamente.

Transformación y DTOs: Aislar las entidades de base de datos exponiendo solo los campos necesarios hacia la API.

Manejo Global de Excepciones: Capturar errores (ej. ID no encontrado) y retornar códigos HTTP acordes (400 Bad Request, 404 Not Found, 500 Internal Error).

## Base de Datos Relacional
Persistencia: Almacenar de manera duradera los datos de las incidencias.

Integridad: Aplicar restricciones de esquema (llaves primarias, campos NOT NULL).