# Sistema de Facturación - Proyecto Educativo

## 🔔 Novedades Recientes

> #### Junio 2025 - v1.4.0 - Gestión de Archivos con Supabase
> 
> - ✅ **Integración con Supabase Storage** para almacenamiento de imágenes
> - ✅ **Procesamiento de imágenes** con optimización y conversión a WebP
> - ✅ **Sistema de avatares** para usuarios
> - ✅ **Carga múltiple de archivos** con manejo inteligente de errores
>
> #### Junio 2025 - v1.3.0 - Autenticación con Redis
> 
> - ✅ **Integración con Redis** para gestión avanzada de sesiones
> - ✅ **Sistema de blacklist** para tokens revocados
> - ✅ **Mejoras en la seguridad** de la autenticación
>
> #### Junio 2025 - v1.2.0 - Filtrado de Facturas y Mejoras de Servicios
> 
> - ✅ **Filtrado de facturas por cliente** implementado
> - ✅ **Mejoras en los servicios de facturación**
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
  <a href="https://redis.io/" target="_blank">
    <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
  </a>
  <a href="https://supabase.com/" target="_blank">
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  </a>
  <a href="https://mongoosejs.com/" target="_blank">
    <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
  </a>
  <a href="https://sequelize.org/" target="_blank">
    <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" alt="Sequelize" />
  </a>
  <a href="https://jwt.io/" target="_blank">
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" />
  </a>
  <a href="https://www.docker.com/" target="_blank">
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  </a>
  <a href="https://docs.docker.com/compose/" target="_blank">
    <img src="https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Compose" />
  </a>
  <a href="https://sharp.pixelplumbing.com/" target="_blank">
    <img src="https://img.shields.io/badge/Sharp-99CC00?style=for-the-badge&logo=node.js&logoColor=white" alt="Sharp" />
  </a>
</p>

- **Node.js**: Entorno de ejecución para JavaScript del lado del servidor
- **Express**: Framework para crear APIs REST de manera sencilla
- **MongoDB**: Base de datos NoSQL para almacenamiento de documentos
- **PostgreSQL**: Base de datos relacional para datos estructurados
- **Redis**: Almacén de estructura de datos en memoria para gestión de sesiones
- **Mongoose**: ODM para facilitar la interacción con MongoDB
- **Sequelize**: ORM para interactuar con PostgreSQL
- **Docker**: Contenedorización de la aplicación y sus dependencias
- **Docker Compose**: Orquestación de contenedores
- **JWT (JSON Web Tokens)**: Autenticación basada en tokens para proteger endpoints
- **bcrypt**: Cifrado de contraseñas para almacenamiento seguro
- **ioredis**: Cliente Redis para Node.js con soporte para Promesas

## 🏗️ Arquitectura

El proyecto sigue una arquitectura basada en componentes con separación clara de responsabilidades:

```
src/
├── components/            # Componentes de la aplicación
│   ├── auth/              # Módulo de autenticación
│   │   ├── auth.controller.js  # Controlador de autenticación
│   │   ├── auth.routes.js      # Rutas de autenticación
│   │   └── service.auth.js     # Lógica de negocio de autenticación
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
│   ├── postgress.js       # Configuración de PostgreSQL
│   └── redis.js           # Configuración de Redis para gestión de sesiones
└── middleware/            # Middleware de la aplicación
    ├── logger.js          # Middleware de registro
    ├── middleware.users.js # Middleware de validación de usuarios
    └── middelware.auth.js # Middleware de autenticación y autorización
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
- `POST /auth/api/register` - Registrar un nuevo usuario
- `POST /auth/api/logout` - Cerrar sesión
- `GET /auth/api/refresh-token` - Renovar el token de acceso

### Usuarios
- `GET /users/api/` - Obtener todos los usuarios (solo admin)
- `GET /users/api/profile` - Obtener perfil del usuario actual
- `GET /users/api/:id` - Obtener un usuario por ID (solo admin)
- `PATCH /users/api/` - Actualizar perfil del usuario actual
- `PATCH /users/api/:id` - Actualizar un usuario (solo admin)
- `POST /users/api/` - Crear un nuevo usuario (solo admin)
- `DELETE /users/api/:id` - Eliminar un usuario (solo admin)
- `POST /users/api/upload-user-image` - Subir imagen de perfil
- `POST /users/api/upload-user-images` - Subir múltiples imágenes

### Facturas
- `GET /invoices/api/` - Obtener todas las facturas (filtradas por usuario si no es admin)
- `GET /invoices/api/:id` - Obtener una factura por ID
- `GET /invoices/api/customer/:id` - Obtener facturas de un cliente específico
- `POST /invoices/api/` - Crear una nueva factura
- `PATCH /invoices/api/:id` - Actualizar una factura
- `DELETE /invoices/api/:id` - Eliminar una factura

### Documentación
- `GET /api-docs` - Documentación interactiva de la API (Swagger UI)

## 📊 Documentación de la API

### Documentación interactiva con Swagger

El proyecto incluye documentación completa e interactiva de la API mediante Swagger UI. Esto permite explorar todos los endpoints disponibles, ver los formatos de solicitud y respuesta, y probar las API directamente desde el navegador.

#### Cómo acceder a la documentación Swagger

1. Inicia la aplicación con `npm run dev` o mediante Docker
2. Abre en tu navegador: `http://localhost:{{port}}/api-docs`
3. Explora la documentación interactiva:
   - Agrupa los endpoints por categorías (Usuarios, Facturas, Autenticación)
   - Muestra los esquemas de datos requeridos
   - Permite probar los endpoints directamente
   - Incluye ejemplos de respuestas de éxito y error

### Colección de Postman

Además de Swagger, el proyecto incluye una colección de Postman lista para ser importada y utilizada para probar todos los endpoints de la API. Esta colección contiene ejemplos preconfigurados para todas las operaciones CRUD tanto para usuarios como para facturas.

#### Cómo usar la colección de Postman

1. Abre Postman
2. Haz clic en "Import"
3. Selecciona el archivo `invoices-app.postman_collection.json` incluido en la raíz del proyecto
4. Una vez importada, configura las variables de entorno necesarias:
   - `url_base`: URL base para los endpoints de facturas (ej. `http://localhost:{{port}}/invoices/api`)

#### Flujo de trabajo recomendado

1. Crear un usuario con el endpoint `POST /auth/api/register`
2. Iniciar sesión con el endpoint `POST /auth/api/login` para obtener las cookies HTTP-Only con los tokens
3. Las cookies se envían automáticamente en cada solicitud, no es necesario configurar headers manualmente
4. El refresh token se renueva automáticamente cuando el access token expira usando el endpoint `POST /auth/api/refresh`
5. Para cerrar sesión, usa el endpoint `POST /auth/api/logout`
6. ¡Ahora puedes realizar operaciones en facturas y usuarios!
7. Para filtrar facturas por cliente, utiliza el endpoint `GET /invoices/api/customer/:id`

## 📊 Bases de Datos

Este proyecto utiliza múltiples sistemas de almacenamiento para diferentes propósitos:

- **MongoDB**: Almacena documentos como facturas
- **PostgreSQL**: Almacena datos estructurados de usuarios
- **Redis**: Gestiona sesiones activas y blacklist de tokens

## 🔒 Seguridad y Autenticación

El sistema implementa un esquema de seguridad avanzado con JWT y Redis:

- **Autenticación por Tokens**:
  - Access Token (15 min de duración)
  - Refresh Token (7 días, almacenado en Redis)
  - Cookies HTTP-Only seguras

- **Protecciones de Seguridad**:
  - Blacklist de tokens revocados
  - Protección contra CSRF
  - Headers de seguridad HTTP

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

### Flujo de Autenticación y Autorización

1. **Inicio de Sesión**:
   - El usuario envía credenciales válidas
   - El servidor genera dos tokens:
     - **Access Token** (corto, 15 minutos)
     - **Refresh Token** (largo, 7 días) almacenado en Redis
   - Ambos tokens se envían como cookies HTTP-Only

2. **Acceso a Rutas Protegidas**:
   - El cliente envía automáticamente las cookies con cada solicitud
   - El middleware `verifyToken`:
     - Verifica el token de acceso

3. **Refresco de Tokens**:
   - Cuando el access token expira, el cliente usa el refresh token
   - Consulta la blacklist en Redis
   - Si el token es válido, permite el acceso
   - El middleware `verifyRefreshToken`:
     - Verifica el refresh token contra Redis
     - Si es válido, genera nuevos tokens
     - Invalida el refresh token anterior

4. **Cierre de Sesión**:
   - El servidor invalida ambos tokens
   - Los tokens se agregan a la blacklist en Redis
   - Se eliminan las cookies del cliente

5. **Control de Acceso**:
   - Para rutas de administrador, se usa `verifyRole`
   - Los controladores verifican la propiedad de los recursos
   - Todas las operaciones se registran para auditoría

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
2. Integración con múltiples bases de datos (SQL, NoSQL y Redis)
3. Gestión de sesiones con Redis
4. Implementación de blacklist para tokens JWT
5. Arquitectura de aplicaciones basada en componentes
6. Uso de Docker para desarrollo y despliegue
7. Estructura de carpetas en Node.js
8. Gestión de configuración y variables de entorno
9. Autenticación de usuarios con JWT y bcrypt
10. Seguridad avanzada en APIs mediante tokens
11. Validaciones de datos con Sequelize
12. Manejo de roles y permisos
13. Implementación de tokens de refresco seguros
14. Gestión de la expiración de sesiones

## 📝 Licencia

Este proyecto está bajo la licencia MIT, lo que permite su uso con fines educativos.

## 👩‍💻 Autor

Desarrollado por Lizeth Castillo - @liztechcode como parte del curso de desarrollo web con Node.js.

---

*Nota: Este README es parte del material educativo y puede ser modificado según las necesidades del curso.*
