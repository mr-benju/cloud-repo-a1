# Reglas de Negocio (RN)

RN-01 — Estado inicial automático: Toda incidencia nueva registrada en el sistema debe asignarse automáticamente en estado ABIERTA.

RN-02 — Campos obligatorios: Los campos título y descripción son obligatorios para crear o actualizar cualquier incidencia.

RN-03 — Valores restringidos de dominio: Los campos prioridad solo pueden aceptar valores del conjunto (BAJA, MEDIA, ALTA) y el estado solo valores válidos (ABIERTA, EN_PROGRESO, RESUELTA).

RN-04 — Validación de recursos existentes:** El sistema no debe aceptar ni procesar peticiones sobre identificadores (IDs) de incidencias inexistentes en la base de datos.