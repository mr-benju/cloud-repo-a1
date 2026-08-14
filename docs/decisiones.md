# Decisiones de Arquitectura

## Elección del Framework Frontend (React con Vite)

Contexto: La actividad exige construir una Single Page Application (SPA) en React que consuma la API del backend. Se debía elegir entre React + Vite o Next.js.

Decisión: El equipo eligió React + Vite.

Justificación: Para una aplicación orientada a uso interno sin requerimientos de SEO (Search Engine Optimization) ni Server-Side Rendering (SSR), Vite ofrece un tiempo de compilación rápido, una configuración mínima y menor sobrecarga de dependencias. Además, facilita la contenerización al generar artefactos estáticos livianos.

Consecuencias: Se simplifica el despliegue y la configuración Docker. La aplicación funciona enteramente en el cliente (Client-Side Rendering).


## Uso de TypeScript en el Frontend

Contexto: Se debía determinar si utilizar JavaScript estándar o TypeScript para el código del cliente.

Decisión: El equipo eligió TypeScript*.

Justificación: TypeScript permite definir interfaces explícitas para las entidades compartidas con el backend (por ejemplo Incidencia, Prioridad, Estado). Esto detecta errores de tipado en tiempo de compilación, previene errores en las respuestas de la API y mejora el autocompletado en el editor.

Consecuencias: Incrementa levemente la curva de tipeo inicial, pero reduce drásticamente los errores en tiempo de ejecución.


## Elección de Base de Datos y Mecanismo de Acceso

Contexto: Se requería una base de datos relacional (PostgreSQL o MySQL) e integrar el acceso desde Spring Boot.

Decisión: Se seleccionó PostgreSQL junto a Spring Data JPA / Hibernate.

Justificación: PostgreSQL es un motor robusto, altamente compatible con estándares SQL y de amplio uso en entornos Cloud Native. El uso de Spring Data JPA evita la escritura de consultas SQL manuales para operaciones CRUD básicas y facilita la paginación y filtrado dinámico derivado de los métodos del repositorio.

Consecuencias: Hibernate gestiona la creación de tablas mediante spring.jpa.hibernate.ddl-auto=update en desarrollo, simplificando la inicialización del esquema.


## Organización en Capas del Backend

Contexto: Era necesario establecer una estructura clara para separar las responsabilidades del backend en Spring Boot.

Decisión: Se adoptó una arquitectura en paquetes estructurada en: controller, service, repository, model, dto y exception.

Justificación:
controller: Gestiona únicamente las peticiones HTTP y mapea DTOs.
service: Contiene la lógica de negocio y aplicación de Reglas de Negocio.
repository: Interfaz de abstracción para el acceso a datos.
dto: Objetos de transferencia para desacoplar las entidades de la API.
exception: Manejo centralizado de errores con @ControllerAdvice.

Consecuencias: Código altamente mantenible, con responsabilidades aisladas que facilitan la prueba y lectura por parte de terceros.


## Estrategia de Contenerización y Ejecución Local

Contexto: La solución completa debe poder levantarse con un solo comando utilizando Docker y Docker Compose, garantizando que los datos no se pierdan al reiniciar.

Decisión:
Backend: Dockerfile multi-stage (Etapa 1: Build con Maven/Gradle, Etapa 2: Runtime con JDK 21 / JRE).
Frontend: Dockerfile con Node.js en modo preview/servidor estático.
Base de Datos: Imagen oficial de PostgreSQL asociando un Volumen Nombrado (postgres_data).

Justificación: La construcción multi-stage reduce el tamaño de la imagen final del backend al no incluir herramientas de compilación en el entorno de ejecución. El volumen asignado en Docker Compose asegura el cumplimiento del RNF-02 (persistencia de datos tras reiniciar contenedores).

Consecuencias: La primera ejecución con docker compose up --build puede tardar unos minutos descargando e instalando dependencias, pero las ejecuciones posteriores son rápidas y aisladas del sistema operativo del host.
