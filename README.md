# Sistema de Facturación - Proyecto Educativo

## 🔔 Novedades Recientes

> #### Junio 2025 - v1.2.0 - Filtrado de Facturas y Mejoras de Servicios
> 
> - ✅ **Filtrado de facturas por cliente** implementado
> - ✅ **Mejoras en los servicios de facturación**
>
>
> #### Junio 2025 - v1.1.0 - Autenticación y Seguridad Mejorada
> 
> - ✅ **Sistema de autenticación JWT** implementado
> - ✅ **Control de acceso basado en roles** (admin/user)
> - ✅ **Validaciones robustas** para datos de usuario
> 
> [Ver CHANGELOG completo](./CHANGELOG.md) para más detalles sobre todas las mejoras.

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
    ├── logger.js          # Middleware de registro
    ├── middleware.users.js # Middleware de validación de usuarios
    └── middelware.auth.js  # Middleware de autenticación y autorización
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
- `POST /auth/api/login` - Iniciar sesión con email y contraseña
- `POST /auth/api/register` - Registrar un nuevo usuario (redirige al controlador de usuarios)

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
- `GET /invoices/api/customer/:id` - Obtener facturas de un cliente específico
- `PUT /invoices/api/:id` - Actualizar una factura
- `DELETE /invoices/api/:id` - Eliminar una factura

## 📃 Colección de Postman

El proyecto incluye una colección de Postman lista para ser importada y utilizada para probar todos los endpoints de la API. Esta colección contiene ejemplos preconfigurados para todas las operaciones CRUD tanto para usuarios como para facturas.

### Cómo usar la colección de Postman

1. Abre Postman
2. Haz clic en "Import"
3. Selecciona el archivo `invoices-app.postman_collection.json` incluido en la raíz del proyecto
4. Una vez importada, configura las variables de entorno necesarias:
   - `url_base`: URL base para los endpoints de facturas (ej. `http://localhost:X000/invoices/api`)

### Flujo de trabajo recomendado

1. Crear un usuario con el endpoint `POST /auth/api/register`
2. Iniciar sesión con el endpoint `POST /auth/api/login` para obtener un token JWT
3. Configurar el token JWT en la autorización de tipo Bearer Token para las solicitudes posteriores
4. ¡Ahora puedes realizar operaciones en facturas y usuarios!
5. Para filtrar facturas por cliente, utiliza el endpoint `GET /invoices/api/customer/:id`

## 📊 Bases de Datos

Este proyecto utiliza dos bases de datos diferentes para demostrar la integración con distintos sistemas:

- **MongoDB**: Utilizada para almacenar documentos como facturas
- **PostgreSQL**: Utilizada para almacenar datos estructurados como usuarios

## 🔒 Seguridad y Autenticación

El sistema implementa un esquema de seguridad basado en tokens JWT:

- **verifyToken**: Middleware que valida el token JWT en las peticiones a endpoints protegidos
- **verifyRole**: Middleware que verifica si el usuario tiene el rol adecuado para acceder a ciertos recursos
- **bcrypt**: Utilizado para el hash seguro de contraseñas antes de almacenarlas en la base de datos

### Roles de Usuario

El sistema soporta dos tipos de roles:

- **user**: Rol estándar con acceso limitado (valor por defecto)
  - Puede crear, leer, actualizar y eliminar SOLO SUS PROPIAS facturas
  - No tiene acceso a información de otros usuarios   
  - Al listar facturas, solo ve las asociadas a su ID de usuario

- **admin**: Rol con privilegios elevados para operaciones administrativas
  - Acceso completo a todos los recursos del sistema
  - Puede gestionar todos los usuarios (crear, leer, actualizar, eliminar)
  - Puede gestionar todas las facturas independientemente del cliente
  - No tiene restricciones en listados o búsquedas

### Implementación de Permisos

El control de acceso se implementa en dos niveles:

1. **Middleware de Autenticación**:
   - Valida que el token JWT sea válido en cada solicitud a endpoints protegidos
   - Extrae la información del usuario (ID y rol) y la adjunta al objeto de solicitud

2. **Middleware de Autorización**:
   - `verifyRole`: Valida que el usuario tenga el rol "admin" para acceder a rutas restringidas
   - Controles de acceso basados en la propiedad de los recursos (un usuario regular solo puede acceder a sus propios recursos)

### Flujo de Autorización

1. El usuario se autentica y recibe un token JWT
2. El token se incluye en el encabezado "Authorization" de las solicitudes subsiguientes
3. El middleware `verifyToken` valida el token y extrae la información del usuario
4. Según la ruta solicitada:
   - Si requiere permisos de administrador, se aplica el middleware `verifyRole`
   - En los controladores, se realizan verificaciones adicionales para garantizar que un usuario solo acceda a sus propios recursos

### Validaciones de Datos

El sistema incluye validaciones robustas mediante Sequelize:

#### Validación de Usuarios

- **Email**:  
  - Debe tener formato válido de correo electrónico
  - No puede estar vacío ni ser nulo
  - Debe ser único en la base de datos

- **Contraseña**:
  - Longitud entre 6 y 12 caracteres
  - No puede estar vacía ni ser nula
  - Se almacena cifrada mediante bcrypt

- **Nombre de usuario**:
  - Requerido (no puede estar vacío)
  - Debe ser único en la base de datos

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
9. Validaciones de datos con Sequelize
10. Manejo de roles y permisos

## 📝 Licencia

Este proyecto está bajo la licencia MIT, lo que permite su uso con fines educativos.

## 👩‍💻 Autor

Desarrollado por Lizeth Castillo - @liztechcode como parte del curso de desarrollo web con Node.js.

---

*Nota: Este README es parte del material educativo y puede ser modificado según las necesidades del curso.*
