# Sistema de Facturación - Proyecto Educativo

## 📚 Descripción

Este es un proyecto educativo de una API REST para gestión de facturación desarrollado con Node.js. El sistema permite la administración de usuarios y facturas, utilizando una arquitectura moderna basada en componentes y siguiendo buenas prácticas de desarrollo.

> **NOTA IMPORTANTE**: Este proyecto ha sido creado con fines exclusivamente educativos como parte de un curso de desarrollo web con Node.js. No está destinado para uso en entornos de producción sin las debidas modificaciones y mejoras de seguridad.

## 🛠️ Tecnologías Utilizadas

<p align="center">
  <a href="https://nodejs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  </a>
  <a href="https://expressjs.com/" target="_blank">
    <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  </a>
  <a href="https://www.mongodb.com/" target="_blank">
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  </a>
  <a href="https://www.postgresql.org/" target="_blank">
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  </a>
  <a href="https://mongoosejs.com/" target="_blank">
    <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
  </a>
  <a href="https://sequelize.org/" target="_blank">
    <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" alt="Sequelize" />
  </a>
  <a href="https://www.docker.com/" target="_blank">
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  </a>
  <a href="https://docs.docker.com/compose/" target="_blank">
    <img src="https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Compose" />
  </a>
</p>

- **Node.js**: Entorno de ejecución para JavaScript del lado del servidor
- **Express**: Framework para crear APIs REST de manera sencilla
- **MongoDB**: Base de datos NoSQL para almacenamiento de documentos
- **PostgreSQL**: Base de datos relacional para datos estructurados
- **Mongoose**: ODM para facilitar la interacción con MongoDB
- **Sequelize**: ORM para interactuar con PostgreSQL
- **Docker**: Contenedorización de la aplicación y sus dependencias
- **Docker Compose**: Orquestación de contenedores
- **JWT**: Autenticación basada en tokens para proteger endpoints
- **bcrypt**: Cifrado de contraseñas para almacenamiento seguro

## 🏗️ Arquitectura

El proyecto sigue una arquitectura basada en componentes con separación clara de responsabilidades:

```
src/
├── components/            # Componentes de la aplicación
│   ├── auth/              # Módulo de autenticación
│   │   ├── auth.controller.js
│   │   ├── auth.routes.js
│   │   └── service.auth.js
│   ├── invoices/          # Módulo de facturas
│   │   ├── controller.invoices.js
│   │   ├── models.invoices.js
│   │   ├── routes.invoices.js
│   │   └── service.invoice.js
│   └── users/             # Módulo de usuarios
│       ├── controller.user.js
│       ├── models.user.js
│       ├── routes.user.js
│       └── service.user.js
├── config/                # Configuración de la aplicación
│   ├── config.js          # Variables de configuración
│   ├── database.js        # Configuración de MongoDB
│   └── postgress.js       # Configuración de PostgreSQL
└── middleware/            # Middleware de la aplicación
    └── logger.js          # Middleware de registro
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (v14 o superior)
- Docker y Docker Compose
- Git

### Pasos para la instalación

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd invoices-app
   ```

2. **Configurar variables de entorno**:
   ```bash
   cp .env_example .env
   ```
   Edita el archivo `.env` con tus propias credenciales y configuraciones.

3. **Instalación con Docker** (recomendado):
   ```bash
   npm run docker
   ```
   Este comando construirá y ejecutará todos los contenedores necesarios.

4. **Instalación local** (alternativa):
   ```bash
   npm install
   npm run dev
   ```
   Nota: Para la instalación local, necesitarás tener MongoDB y PostgreSQL instalados y configurados.

## 🔌 Endpoints API

### Autenticación
- `POST /auth/login` - Iniciar sesión con email y contraseña
- `POST /auth/register` - Registrar un nuevo usuario

### Usuarios
- `GET /users/api` - Obtener todos los usuarios
- `POST /users/api` - Crear un nuevo usuario
- `GET /users/api/:id` - Obtener un usuario por ID
- `PUT /users/api/:id` - Actualizar un usuario
- `DELETE /users/api/:id` - Eliminar un usuario

### Facturas
- `GET /invoices/api` - Obtener todas las facturas
- `POST /invoices/api` - Crear una nueva factura
- `GET /invoices/api/:id` - Obtener una factura por ID
- `PUT /invoices/api/:id` - Actualizar una factura
- `DELETE /invoices/api/:id` - Eliminar una factura

## 🧪 Colección de Postman

El proyecto incluye una colección de Postman lista para ser importada y utilizada para probar todos los endpoints de la API. Esta colección contiene ejemplos preconfigurados para todas las operaciones CRUD tanto para usuarios como para facturas.

### Cómo usar la colección de Postman

1. Abre Postman
2. Haz clic en "Import"
3. Selecciona el archivo `invoices-app.postman_collection.json` incluido en la raíz del proyecto
4. Una vez importada, configura las variables de entorno necesarias:
   - `invoices_base`: URL base para los endpoints de facturas (ej. `http://localhost:3000/invoices/api`)
   - `users_base`: URL base para los endpoints de usuarios (ej. `http://localhost:3000/users/api`)
5. ¡Listo para probar la API!

## 📊 Bases de Datos

Este proyecto utiliza dos bases de datos diferentes para demostrar la integración con distintos sistemas:

- **MongoDB**: Utilizada para almacenar documentos como facturas
- **PostgreSQL**: Utilizada para almacenar datos estructurados como usuarios

## 🧪 Objetivos Educativos

Este proyecto está diseñado para enseñar:

1. Desarrollo de APIs REST con Express
2. Integración con múltiples bases de datos (SQL y NoSQL)
3. Arquitectura de aplicaciones basada en componentes
4. Uso de Docker para desarrollo y despliegue
5. Estructura de carpetas en Node.js
6. Gestión de configuración y variables de entorno
7. Autenticación de usuarios con JWT y bcrypt
8. Seguridad en APIs mediante tokens

## 📝 Licencia

Este proyecto está bajo la licencia MIT, lo que permite su uso con fines educativos.

## 👩‍💻 Autor

Desarrollado por Lizeth Castillo - @liztechcode como parte del curso de desarrollo web con Node.js.

---

*Nota: Este README es parte del material educativo y puede ser modificado según las necesidades del curso.*
