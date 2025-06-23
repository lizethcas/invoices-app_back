/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operaciones relacionadas con usuarios
 */

/**
 * @swagger
 * /users/api/:
 *  get:
 *    summary: Obtiene todos los usuarios
 *    tags: [Users]
 *    description: |
 *      Este endpoint retorna una lista de todos los usuarios registrados en el sistema.
 *      
 *      📌 **Notas importantes:**
 *      - Requiere autenticación mediante token JWT.
 *      - Solo los usuarios con rol de administrador pueden acceder a esta información.
 * 
 *      
 *      🔒 **Seguridad:**
 *      - Se requiere una cookie HTTPOnly con el token de autenticación.
 *      - La cookie se establece automáticamente al iniciar sesión.
 *      
 *      🚨 **Errores comunes:**
 *      - `401`: No autenticado o token inválido.
 *      - `403`: No autorizado para ver los usuarios.
 *      - `500`: Error interno del servidor.
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: Lista de usuarios obtenida exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/ForbiddenError'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /users/api/{id}:
 *  get:
 *    summary: Obtiene un usuario por su ID
 *    tags: [Users]
 *    description: |
 *      Este endpoint retorna los detalles de un usuario específico según su ID.
 *      
 *      📌 **Notas importantes:**
 *      - Requiere autenticación mediante token JWT.
 *      - Solo el administrador puede ver los detalles de cualquier usuario.
 *      - solo el usuario autenticado puede ver sus propios datos
 *      
 *      🔒 **Seguridad:**
 *      - Se requiere una cookie HTTPOnly con el token de autenticación.
 *      - La cookie se establece automáticamente al iniciar sesión.
 *      
 *      🚨 **Errores comunes:**
 *      - `400`: ID de usuario no proporcionado o inválido.
 *      - `401`: No autenticado o token inválido.
 *      - `403`: No autorizado para ver este usuario.
 *      - `404`: Usuario no encontrado.
 *      - `500`: Error interno del servidor.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID único del usuario
 *        schema:
 *          type: string
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: Usuario obtenido exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        $ref: '#/components/responses/BadRequestError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/ForbiddenError'
 *      404:
 *        description: Usuario no encontrado
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /users/api/:
 *  post:
 *    summary: Crea un nuevo usuario
 *    tags: [Users]
 *    description: |
 *      Este endpoint permite crear un nuevo usuario en el sistema.
 *      
 *      📌 **Notas importantes:**
 *      - Requiere autenticación mediante token JWT.
 *      - Solo los administradores pueden crear nuevos usuarios con esta ruta
 *      
 *      🔒 **Seguridad:**
 *      - Se requiere una cookie HTTPOnly con el token de autenticación.
 *      - La cookie se establece automáticamente al iniciar sesión.
 *      
 *      🚨 **Errores comunes:**
 *      - `400`: Datos del usuario inválidos o faltantes.
 *      - `401`: No autenticado o token inválido.
 *      - `403`: No autorizado para crear usuarios.
 *      - `409`: El correo electrónico ya está registrado.
 *      - `500`: Error al crear el usuario.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      201:
 *        description: Usuario creado exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        $ref: '#/components/responses/BadRequestError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/ForbiddenError'
 *      409:
 *        description: El correo electrónico ya está registrado
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /users/api/{id}:
 *  delete:
 *    summary: Elimina un usuario
 *    tags: [Users]
 *    description: |
 *      Este endpoint permite eliminar un usuario del sistema.
 *      
 *      📌 **Notas importantes:**
 *      - Requiere autenticación mediante token JWT.
 *      - Solo los administradores pueden eliminar usuarios con esta ruta.
 *      - solo el usuario autenticado puede eliminar su propia cuenta
 *      
 *      🔒 **Seguridad:**
 *      - Se requiere una cookie HTTPOnly con el token de autenticación.
 *      - La cookie se establece automáticamente al iniciar sesión.
 *      
 *      🚨 **Errores comunes:**
 *      - `400`: ID de usuario inválido.
 *      - `401`: No autenticado o token inválido.
 *      - `403`: No autorizado para eliminar este usuario.
 *      - `404`: Usuario no encontrado.
 *      - `500`: Error al eliminar el usuario.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID único del usuario a eliminar
 *        schema:
 *          type: string
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: Usuario eliminado exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Usuario eliminado exitosamente
 *      400:
 *        $ref: '#/components/responses/BadRequestError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/ForbiddenError'
 *      404:
 *        description: Usuario no encontrado
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /users/api/upload-user-image:
 *  post:
 *    summary: Sube una imagen de usuario
 *    tags: [Users]
 *    description: |
 *      Este endpoint permite subir una imagen de perfil para un usuario.
 *      
 *      📌 **Notas importantes:**
 *      - Requiere autenticación mediante token JWT.
 *      - Los usuarios pueden subir sus propias imágenes,
 *      - Se admite un solo archivo por petición.
 *      
 *      🔒 **Seguridad:**
 *      - Se requiere una cookie HTTPOnly con el token de autenticación.
 *      - La cookie se establece automáticamente al iniciar sesión.
 *      
 *      🚨 **Errores comunes:**
 *      - `400`: Archivo no proporcionado o formato inválido.
 *      - `401`: No autenticado o token inválido.
 *      - `403`: No autorizado para subir archivos.
 *      - `500`: Error al subir el archivo.
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              file:
 *                type: string
 *                format: binary
 *                description: Archivo de imagen a subir (JPEG, PNG, GIF)
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: Imagen subida exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                url:
 *                  type: string
 *                  example: 'https://ejemplo.com/images/user/profile-123.jpg'
 *                message:
 *                  type: string
 *                  example: 'Imagen subida exitosamente'
 *      400:
 *        $ref: '#/components/responses/BadRequestError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/ForbiddenError'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /users/api/:
 *  patch:
 *    summary: Actualiza el usuario actual
 *    tags: [Users]
 *    description: |
 *      Este endpoint permite al usuario autenticado actualizar su propia información.
 *      
 *      📌 **Notas importantes:**
 *      - Solo se pueden actualizar los campos enviados en la solicitud.
 *      - El correo electrónico debe ser único en el sistema.
 *      
 *      🔒 **Seguridad:**
 *      - Se requiere una cookie HTTPOnly con el token de autenticación.
 *      - La cookie se establece automáticamente al iniciar sesión.
 *      
 *      🚨 **Errores comunes:**
 *      - `400`: Datos de actualización inválidos.
 *      - `401`: No autenticado o token inválido.
 *      - `409`: El correo electrónico ya está en uso.
 *      - `500`: Error al actualizar el usuario.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *                format: password
 *              role:
 *                type: string
 *                enum: [user, admin]
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: Usuario actualizado exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        $ref: '#/components/responses/BadRequestError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      409:
 *        description: El correo electrónico ya está en uso
 *      500:
 *        $ref: '#/components/responses/ServerError'
 *
 * @swagger
 * /users/api/{id}:
 *  patch:
 *    summary: Actualiza un usuario específico (Admin)
 *    tags: [Users]
 *    description: |
 *      Este endpoint permite a un administrador actualizar cualquier usuario del sistema.
 *      
 *      📌 **Notas importantes:**
 *      - Solo usuarios con rol de administrador pueden usar esta ruta.
 *      - Se pueden actualizar todos los campos del usuario.
 *      
 *      🔒 **Seguridad:**
 *      - Se requiere una cookie HTTPOnly con el token de autenticación.
 *      - La cookie se establece automáticamente al iniciar sesión.
 * 
 *      🚨 **Errores comunes:**
 *      - `400`: ID de usuario inválido o datos de actualización incorrectos.
 *      - `401`: No autenticado o token inválido.
 *      - `403`: No autorizado (se requiere rol de administrador).
 *      - `404`: Usuario no encontrado.
 *      - `409`: El correo electrónico ya está en uso.
 *      - `500`: Error al actualizar el usuario.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del usuario a actualizar
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *                format: password
 *              role:
 *                type: string
 *                enum: [user, admin]
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: Usuario actualizado exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        $ref: '#/components/responses/BadRequestError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/ForbiddenError'
 *      404:
 *        description: Usuario no encontrado
 *      409:
 *        description: El correo electrónico ya está en uso
 *      500:
 *        $ref: '#/components/responses/ServerError'
 *
 * 
 * 
 * @swagger
 * /users/api/profile:
 *  get:
 *    summary: Obtiene el perfil del usuario actual
 *    tags: [Users]
 *    description: |
 *      Este endpoint devuelve la información del perfil del usuario autenticado.
 *      
 *      📌 **Notas importantes:**
 *      - Solo devuelve la información del usuario que realiza la petición.
 *      - Incluye información sensible como el correo electrónico y el rol.
 *      
 *      🔒 **Seguridad:**
 *      - Se requiere autenticación mediante token JWT.
 *      
 *      🚨 **Errores comunes:**
 *      - `401`: No autenticado o token inválido.
 *      - `500`: Error al obtener el perfil del usuario.
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: Perfil de usuario obtenido exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 *
/**
 * @swagger
 * /users/api/upload-user-images:
 *  post:
 *    summary: Sube múltiples imágenes de usuario
 *    tags: [Users]
 *    description: |
 *      Este endpoint permite subir múltiples imágenes relacionadas con un usuario.
 *      
 *      📌 **Notas importantes:**
 *      - Requiere autenticación mediante token JWT.
 *      - Los usuarios pueden subir sus propias imágenes
 *      - Se pueden subir hasta 5 archivos por petición.
 *      
 *      🔒 **Seguridad:**
 *      - Se requiere una cookie HTTPOnly con el token de autenticación.
 *      - La cookie se establece automáticamente al iniciar sesión.
 *      
 *      🚨 **Errores comunes:**
 *      - `400`: Archivos no proporcionados o formato inválido.
 *      - `401`: No autenticado o token inválido.
 *      - `403`: No autorizado para subir archivos.
 *      - `500`: Error al subir los archivos.
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              files:
 *                type: array
 *                items:
 *                  type: string
 *                  format: binary
 *                description: Archivos de imagen a subir (JPEG, PNG, GIF)
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: Imágenes subidas exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                urls:
 *                  type: array
 *                  items:
 *                    type: string
 *                    example: 'https://ejemplo.com/images/user/gallery-123.jpg'
 *                message:
 *                  type: string
 *                  example: 'Imágenes subidas exitosamente'
 *      400:
 *        $ref: '#/components/responses/BadRequestError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/ForbiddenError'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
