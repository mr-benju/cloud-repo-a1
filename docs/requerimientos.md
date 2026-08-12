# Levantamiento de Requerimientos

## Requerimientos Funcionales (RF)

RF-01 — Registrar incidencia: El sistema debe permitir registrar una nueva incidencia técnica solicitando título, descripción, categoría y prioridad.

RF-02 — Listar incidencias: El sistema debe mostrar una lista general de todas las incidencias registradas con su estado, prioridad y fecha de creación.

RF-03 — Ver detalle de incidencia: El sistema debe permitir seleccionar una incidencia para visualizar la totalidad de sus campos e información registrada.

RF-04 — Actualizar incidencia: El sistema debe permitir editar los datos de una incidencia existente, incluyendo título, descripción, categoría y prioridad.

RF-05 — Eliminar incidencia: El sistema debe permitir eliminar un registro de incidencia del sistema.

RF-06 — Cambio rápido de estado: El sistema debe permitir modificar el estado de una incidencia (de ABIERTA a EN_PROGRESO o RESUELTA) desde la interfaz.

RF-07 — Filtrado por estado o prioridad: El sistema debe permitir filtrar el listado de incidencias según su estado o nivel de prioridad mediante una consulta al backend.

RF-08 — Contador de incidencias por estado: El sistema debe mostrar un resumen o indicador con la cantidad total de incidencias agrupadas por su estado actual.


## Requerimientos No Funcionales (RNF)

RNF-01 — Ejecución reproducible: La aplicación completa debe poder iniciarse mediante un único comando (docker compose up --build) siguiendo las instrucciones del README.

RNF-02 — Persistencia de datos: La información almacenada en la base de datos debe conservarse al reiniciar o apagar los contenedores mediante el uso de un volumen asignado.

RNF-03 — Manejo de errores intuitivo: Las validaciones fallidas o errores del sistema deben retornar códigos HTTP adecuados y mensajes comprensibles tanto para el frontend como para el usuario final.

RNF-04 — Mantenibilidad y separación de capas: El backend debe mantener una estructura clara separando controladores, servicios, repositorios y modelos para facilitar su lectura y mantenimiento.

RNF-05 — Usabilidad básica: La interfaz web debe ser intuitiva, permitir realizar las acciones CRUD en pocos pasos y confirmar visualmente el éxito o error de cada operación.


# Criterios de Aceptación

## Criterio para RF-01

Dado: que el usuario completó los campos obligatorios de título, descripción, categoría y prioridad,
Cuando: hace clic en el botón de registrar,
Entonces: la incidencia se almacena en la base de datos,
Y: aparece reflejada en el listado principal con el estado ABIERTA.

## Criterio para RF-06
Dado: una incidencia en estado ABIERTA,
Cuando: el usuario presiona la opción para actualizar su estado a EN_PROGRESO,
Entonces: el sistema actualiza el registro mediante una petición al backend,
Y: la interfaz actualiza la vista mostrando la incidencia con su nuevo estado.

## Criterio para RF-07
Dado: que existen múltiples incidencias registradas con distintos estados,
Cuando: el usuario selecciona el filtro por estado RESUELTA,
Entonces: el frontend consulta al backend enviando el parámetro correspondiente,
Y: la tabla/lista principal muestra únicamente las incidencias que coinciden con dicho estado.

# Alcance y Fuera de Alcance

## Dentro del Alcance
Interfaz web responsiva integrada con React.
API REST funcional implementada en Spring Boot con operaciones CRUD completas.
Persistencia en base de datos relacional (PostgreSQL/MySQL).
Contenerización completa y orquestación con Docker Compose.
Módulos adicionales: Filtrado por parámetros y contador por estados.

## Fuera de Alcance
Autenticación y autorización de usuarios (JWT, OAuth, roles).
Notificaciones por correo electrónico o push.
Subida de archivos adjuntos a las incidencias.
Arquitectura basada en microservicios o mensajería asíncrona.
Despliegue en proveedores de nube pública (AWS, GCP, Azure).