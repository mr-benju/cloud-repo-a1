## Sistema de Gestión de Incidencias - Soporte Técnico

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

Plataforma Cloud-Native para la gestión, seguimiento y resolución de incidencias y fallas técnicas en tiempo real. Este proyecto ha sido desarrollado siguiendo una arquitectura multicapa containerizada mediante Docker Compose.

## Arquitectura General

El sistema está compuesto por 3 servicios principales totalmente aislados en contenedores:

[ Frontend: React + Vite ] (Puerto 80)
│
▼ HTTP / REST API
[ Backend: Spring Boot 3/4 ] (Puerto 8080)
│
▼ JPA / JDBC
[ Base de Datos: PostgreSQL ] (Puerto 5432)


1. Frontend: Interfaz de usuario SPA desarrollada en React con Vite y TypeScript, servida mediante Nginx.

2. Backend: API REST en Java 21 con Spring Boot, Spring Data JPA y validaciones de DTOs.

3. Database: Motor de base de datos relacional PostgreSQL con almacenamiento persistente mediante Docker Volumes.

## Tecnologías Utilizadas

Backend: Java 21, Spring Boot, Spring Data JPA, Lombok, Maven/Gradle.

Frontend: React, TypeScript, Vite, Tailwind CSS / Lucide Icons.

Infraestructura: Docker, Docker Compose.

Base de Datos: PostgreSQL 15+.

## Estructura del Repositorio

## Estructura del Repositorio

```text
cloud-repo-a1/
├── docs/                   # Documentación técnica y arquitectura
│   ├── arquitectura.md
│   ├── decisiones.md
│   ├── reglasNegocio.md
│   └── requerimientos.md
├── backend/                # API REST - Java 21 / Spring Boot
│   ├── src/main/java/com/diagnostico/incidencias/
│   │   ├── controller/     # Endpoints REST (IncidenciaController)
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── exception/      # Manejo global de excepciones
│   │   ├── model/          # Entidades JPA y Enums (Estado, Prioridad)
│   │   ├── repository/     # Interfaces de acceso a base de datos
│   │   └── service/        # Lógica de negocio
│   └── Dockerfile
├── frontend/               # Cliente Web - React / Vite + TypeScript
│   ├── src/
│   │   ├── services/
│   │   │   └── api.ts      # Cliente Axios/Fetch para comunicación con Backend
│   │   ├── types/
│   │   │   └── incidencia.ts # Interfaces y tipos TypeScript
│   │   ├── App.tsx         # Componente principal
│   │   └── main.tsx        # Punto de entrada de React
│   ├── Dockerfile          # Build multi-stage para entorno contenedorizado
│   └── nginx.conf          # Configuración del servidor web Nginx
├── docker-compose.yml      # Orquestación de contenedores (App + DB)
└── README.md               # Guía principal del proyecto
```

## Requisitos Previos:
## Para ejecutar la aplicación localmente solo necesitas tener instalado:

Docker Desktop (con Docker Engine y Docker Compose activos).

Git (para clonar el repositorio).

## Pasos para Ejecutar el Proyecto:

## Clonar el repositorio:

git clone [https://github.com/mr-benju/cloud-repo-a1.git](https://github.com/mr-benju/cloud-repo-a1.git)

cd cloud-repo-a1

## Levantar el stack completo con Docker Compose:

docker compose up --build -d

## Acceder a las aplicaciones:

Frontend Web (Interfaz de usuario): http://localhost (o http://localhost:80)

Backend API (Endspoints REST): http://localhost:8080/api/incidencias

## Verificar estado de los servicios:

docker compose ps

## Monitorear logs en tiempo real:

docker compose logs -f

## Detener el Entorno:

Para detener y liberar las redes y contenedores mantenindo la persistencia de datos:

docker compose down

## Documentación Adicional:

## Para más detalles sobre los requerimientos, decisiones de arquitectura y reglas de negocio, consulta la carpeta /docs:

* 📄 [Requerimientos del Sistema](./docs/requerimientos.md)
* 📐 [Arquitectura del Sistema](./docs/arquitectura.md)
* 🧠 [Decisiones Técnicas (DA-01 a DA-05)](./docs/decisiones.md)
* 📜 [Reglas de Negocio](./docs/reglasNegocio.md)
