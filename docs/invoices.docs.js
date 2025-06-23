
/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: Operaciones relacionadas con facturas
 */

/**
 * @swagger
 * /invoices/api/:
 *  get:
 *    summary: Obtiene todas las facturas
 *    tags: [Invoices]
 *    description: |
 *      Este endpoint retorna una lista de todas las facturas registradas en el sistema.
 *      
 *      📌 **Notas importantes:**
 *      - Requiere autenticación mediante token JWT.
 *      - El usuario debe tener permisos de administrador o ser el propietario de las facturas.
 *      
 *      🔒 **Seguridad:**
 *      - Se requiere una cookie HTTPOnly con el token de autenticación.
 *      - La cookie se establece automáticamente al iniciar sesión.
 *      
 *      🚨 **Errores comunes:**
 *      - `401`: No autenticado o token inválido.
 *      - `403`: No autorizado para ver las facturas.
 *      - `500`: Error interno del servidor.
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: Lista de facturas obtenida exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Invoice'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/ForbiddenError'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */

/**
/**
 * @swagger
 * /invoices/api/{id}:
 *  get:
 *    summary: Obtiene una factura por su ID
 *    tags: [Invoices]
 *    description: |
 *      Este endpoint retorna los detalles de una factura específica según su ID.
 *      
 *      📌 **Notas importantes:**
 *      - Requiere autenticación mediante token JWT.
 *      - Solo el administrador o el propietario de la factura pueden verla.
 *      
 *      🔒 **Seguridad:**
 *      - Se requiere una cookie HTTPOnly con el token de autenticación.
 *      - La cookie se establece automáticamente al iniciar sesión.
 *      
 *      🚨 **Errores comunes:**
 *      - `400`: ID de factura no proporcionado o inválido.
 *      - `401`: No autenticado o token inválido.
 *      - `403`: No autorizado para ver esta factura.
 *      - `404`: Factura no encontrada.
 *      - `500`: Error interno del servidor.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID único de la factura
 *        schema:
 *          type: string
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: Factura obtenida exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Invoice'
 *      400:
 *        $ref: '#/components/responses/BadRequestError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/ForbiddenError'
 *      404:
 *        description: Factura no encontrada
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /invoices/api/:
 *  post:
 *    summary: Crea una nueva factura
 *    tags: [Invoices]
 *    description: |
 *      Este endpoint permite crear una nueva factura en el sistema.
 *      
 *      📌 **Notas importantes:**
 *      - Requiere autenticación mediante token JWT.
 *      - El usuario solo puede crear sus propias facturas. El administrador puede crear facturas para cualquier usuario.
 *      - La fecha se establecerá automáticamente al momento de la creación.
 *      
 *      🔒 **Seguridad:**
 *      - Se requiere una cookie HTTPOnly con el token de autenticación.
 *      - La cookie se establece automáticamente al iniciar sesión.
 *      
 *      🚨 **Errores comunes:**
 *      - `400`: Datos de la factura inválidos o faltantes.
 *      - `401`: No autenticado o token inválido.
 *      - `403`: No autorizado para crear facturas.
 *      - `500`: Error al crear la factura.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Invoice'
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      201:
 *        description: Factura creada exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Invoice'
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
 * /invoices/api/{id}:
 *  patch:
 *    summary: Actualiza una factura existente
 *    tags: [Invoices]
 *    description: |
 *      Este endpoint permite actualizar los datos de una factura existente.
 *      
 *      📌 **Notas importantes:**
 *      - Requiere autenticación mediante token JWT.
 *      - Solo el administrador o el propietario de la factura pueden actualizarla.
 *      - No se puede modificar una factura que ya ha sido pagada o cancelada.
 *      
 *      🔒 **Seguridad:**
 *      - Se requiere una cookie HTTPOnly con el token de autenticación.
 *      - La cookie se establece automáticamente al iniciar sesión.
 *      
 *      🚨 **Errores comunes:**
 *      - `400`: Datos de la factura inválidos o faltantes.
 *      - `401`: No autenticado o token inválido.
 *      - `403`: No autorizado para actualizar esta factura.
 *      - `404`: Factura no encontrada.
 *      - `409`: No se puede modificar una factura en su estado actual.
 *      - `500`: Error al actualizar la factura.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID único de la factura a actualizar
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Invoice'
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: Factura actualizada exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Invoice'
 *      400:
 *        $ref: '#/components/responses/BadRequestError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/ForbiddenError'
 *      404:
 *        description: Factura no encontrada
 *      409:
 *        description: No se puede modificar una factura en su estado actual
 *      500:
 *        $ref: '#/ServerError'
 */

/**
 * @swagger
 * /invoices/api/{id}:
 *  delete:
 *    summary: Elimina una factura
 *    tags: [Invoices]
 *    description: |
 *      Este endpoint permite eliminar una factura del sistema.
 *      
 *      📌 **Notas importantes:**
 *      - Requiere autenticación mediante token JWT.
 *      - el administrador puede eliminar cualquier factura, el propietario solo puede eliminar sus propias facturas.
 *      - Por seguridad, las facturas no se eliminan físicamente, sino que se marcan como canceladas.
 *      
 *      🔒 **Seguridad:**
 *      - Se requiere una cookie HTTPOnly con el token de autenticación.
 *      - La cookie se establece automáticamente al iniciar sesión.
 *      
 *      🚨 **Errores comunes:**
 *      - `400`: ID de factura inválido.
 *      - `401`: No autenticado o token inválido.
 *      - `403`: No autorizado para eliminar esta factura.
 *      - `404`: Factura no encontrada.
 *      - `500`: Error al eliminar la factura.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID único de la factura a eliminar
 *        schema:
 *          type: string
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: Factura eliminada exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Factura eliminada exitosamente
 *      400:
 *        $ref: '#/components/responses/BadRequestError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/ForbiddenError'
 *      404:
 *        description: Factura no encontrada
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /invoices/api/customer/{id}:
 *  get:
 *    summary: Obtiene las facturas de un cliente
 *    tags: [Invoices]
 *    description: |
 *      Este endpoint retorna todas las facturas asociadas a un cliente específico.
 *      
 *      📌 **Notas importantes:**
 *      - Requiere autenticación mediante token JWT.
 *      - Solo el administrador o el propietario de las facturas pueden verlas.
 *      
 *      🔒 **Seguridad:**
 *      - Se requiere una cookie HTTPOnly con el token de autenticación.
 *      - La cookie se establece automáticamente al iniciar sesión.
 *      
 *      🚨 **Errores comunes:**
 *      - `400`: ID de cliente inválido.
 *      - `401`: No autenticado o token inválido.
 *      - `403`: No autorizado para ver estas facturas.
 *      - `500`: Error al obtener las facturas.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del cliente cuyas facturas se desean consultar
 *        schema:
 *          type: string
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: Lista de facturas del cliente
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Invoice'
 *      400:
 *        $ref: '#/components/responses/BadRequestError'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      403:
 *        $ref: '#/components/responses/ForbiddenError'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
