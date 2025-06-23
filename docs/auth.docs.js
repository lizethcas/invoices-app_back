
//iniciar sesion
/**
 * @swagger
 * /auth/api/login:
 *  post:
 *      summary: Iniciar sesión
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              format: email
 *                              description: Email del usuario
 *                          password:
 *                              type: string
 *                              description: Contraseña del usuario
 *                      required:
 *                          - email
 *                          - password
 *      responses:
 *          200:
 *              description: Inicio de sesión exitoso
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              user:
 *                                  $ref: '#/components/schemas/User'
 *                  
 *          401:
 *              description: Credenciales inválidas
 *          500:
 *              description: Error al iniciar sesión
 */


//cerrar sesion
/**
 * @swagger
 * /auth/api/logout:
 *  post:
 *      summary: Cerrar sesión
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              format: email
 *                              description: Email del usuario
 *                          password:
 *                              type: string
 *                              description: Contraseña del usuario
 *                      required:
 *                          - email
 *                          - password
 *      responses:
 *          200:
 *              description: Cierre de sesión exitoso
 *          401:
 *              description: No autenticado
 *          500:
 *              description: Error al cerrar sesión
 * 
 */

//registrar usuario
/**
 * @swagger
 * /auth/api/register:
 *  post:
 *      summary: Registrar un nuevo usuario
 *      tags: [Auth]
 *      description: |
 *          Este endpoint permite registrar un nuevo usuario en la aplicación.
 *          
 *          El cliente debe enviar un objeto JSON con los campos `username`, `email` y `password`, los cuales son obligatorios.
 *          
 *          📌 **Notas importantes:**
 *          - El `email` debe tener un formato válido y es unico en el sistema.
 *          - La contraseña será encriptada antes de ser almacenada en la base de datos.
 *          
 *          🔒 **Seguridad:** 
 *          Este endpoint no requiere autenticación previa. Sin embargo, se recomienda implementar validaciones de seguridad como verificación de email o validación CAPTCHA en producción.
 *          
 *          🚨 **Errores comunes:**
 *          - `400`: El usuario ya existe o los datos enviados no son válidos.
 *          - `500`: Error interno del servidor al intentar registrar el nuevo usuario.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          username:
 *                              type: string
 *                              example: nuevousuario
 *                          email:
 *                              type: string
 *                              format: email
 *                              example: nuevousuario@ejemplo.com
 *                          password:
 *                              type: string
 *                              format: password
 *                              example: contraseña123
 *      responses:
 *          200:
 *              description: Usuario creado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              user:
 *                                  $ref: '#/components/schemas/User'
 *          400:
 *              description: Error en la solicitud (ej. usuario ya existe)
 *          500:
 *              description: Error al crear el usuario
 */

//generar nuevo token de acceso

/**
 * @swagger
 * /auth/api/refresh-token:
 *  get:
 *      summary: Generar nuevo token de acceso
 *      tags: [Auth]
 *      description: |
 *          Este endpoint permite generar un nuevo token de acceso utilizando el refresh token almacenado en una cookie HTTPOnly.  
 *          No es necesario enviar datos en el body ni en los headers.  
 *          El servidor leerá automáticamente la cookie `refreshToken` (protegida como HTTPOnly) y devolverá un nuevo token de acceso.  
 *          
 *          ✅ **Importante:** Asegúrate de enviar las cookies en la solicitud, especialmente si estás trabajando desde el frontend (`withCredentials: true` en Axios o `credentials: 'include'` en Fetch).  
 *          
 *          🔐 **Seguridad:** Este endpoint valida que el refresh token sea válido y no haya expirado. En caso contrario, devolverá un error 401.
 *      responses:
 *          200:
 *              description: Tokens de acceso y actualización generados exitosamente
 *              headers:
 *                  Set-Cookie:
 *                      description: |
 *                          Esta respuesta establece **dos cookies**:
 *                          - `accessToken`: duración corta (ej. 15 minutos), utilizada para autenticación en cada request.
 *                          - `refreshToken`: duración más larga (ej. 7 días), utilizada para renovar el access token cuando expira.  
 *                          
 *                          Ambas cookies están configuradas como `HttpOnly`, `SameSite=Strict`, `Path=/` y `Secure` si aplica.
 *                      schema:
 *                          type: string
 *                          example: accessToken=eyJhbGciOi...; HttpOnly; Path=/; Max-Age=900
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "Token actualizado correctamente"
 *                              user:
 *                                  $ref: '#/components/schemas/User'
 *          401:
 *              description: No autenticado (refresh token inválido, expirado o no proporcionado)
 *          500:
 *              description: Error al generar el token
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "Error al generar nuevo token"
 *                              error:
 *                                  type: string
 *                                  description: Mensaje detallado del error
 */