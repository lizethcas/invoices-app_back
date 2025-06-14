# 🚀 NOVEDADES - Sistema de Facturación

## Junio 2025 - Versión 1.2.0

### ✨ Nuevas características

#### Filtrado de Facturas Mejorado
- **Filtrado de facturas por cliente** implementado con nuevo endpoint
- **Mejoras en los servicios de facturación** para optimizar consultas
- **Endpoint GET /invoices/api/customer/:id** disponible para consultas específicas

#### Documentación de Roles y Permisos en README
- **Documentación detallada de roles** (user y admin) con sus permisos específicos
- **Descripción del flujo de autorización** paso a paso
- **Implementación de permisos** documentada a nivel de middleware y controladores

### 📝 Mejoras en la Documentación
- **README enriquecido** con información sobre el nuevo endpoint y filtrado
- **Sistema de roles y permisos** documentado a detalle
- **Flujo de uso para filtrado por cliente** añadido a la documentación

### 🧹 Mejoras Internas
- **Refactorización del controlador de facturas** para soportar nuevo endpoint
- **Mejor manejo de errores** para consultas de facturas por cliente

---

## Junio 2025 - Versión 1.1.0

### ✨ Nuevas características

#### Sistema de Autenticación Mejorado

- **JWT (JSON Web Token)** implementado para la protección de endpoints
- **Verificación de roles** para control de acceso granular
- **Middleware de autenticación** para proteger rutas sensibles

#### Validaciones Robustas

- **Validaciones completas** en modelo de usuario:
  - Email con formato válido, no vacío y único en la base de datos
  - Contraseña con longitud entre 6-12 caracteres, no vacía
- **Manejo de errores mejorado** en registros y login
- **Asignación de roles por defecto** para nuevos usuarios

#### Seguridad Reforzada

- **Contraseñas cifradas** con bcrypt (nunca en texto plano)
- **Control de acceso basado en roles** (admin y user)
- **Variables de entorno** para configuraciones sensibles como SECRET_KEY

### 📝 Actualización de la Documentación

- **README enriquecido** con información detallada sobre autenticación
- **Flujo de autenticación documentado** paso a paso
- **Guías para probar la API** con instrucciones para Postman

### 🔧 Correcciones

- **Registro de usuario** ahora asigna correctamente el rol por defecto
- **Validaciones más robustas** previenen la creación de usuarios con datos inválidos
- **Mejor manejo de errores** con mensajes descriptivos

---

## Próximas Mejoras Planificadas
- Implementación de recuperación de contraseñas
- Sistema de verificación de email
- Caducidad configurable para tokens JWT
- Pruebas de calidad
- Documentación detallada de la API con Swagger
- Despliegue en Docker con docker-compose
  
