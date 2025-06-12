# 🚀 NOVEDADES - Sistema de Facturación

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

### 📝 Documentación Actualizada
- **README enriquecido** con información detallada sobre autenticación
- **Flujo de autenticación documentado** paso a paso
- **Guías para probar la API** con instrucciones para Postman

### 🔧 Correcciones
- **Registro de usuario** ahora asigna correctamente el rol por defecto
- **Validaciones más robustas** previenen la creación de usuarios con datos inválidos
- **Mejor manejo de errores** con mensajes descriptivos

---

## Próximas Mejoras Planificadas
- Cierre de sesiones
- Implementación de recuperación de contraseñas
- Sistema de verificación de email
- Caducidad configurable para tokens JWT
- Pruebas de calidad
- Documentación detallada de la API con Swagger
- Despliegue en Docker con docker-compose
  
