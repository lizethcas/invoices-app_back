/**
 * @swagger
 * components:
 *   responses:
 *     BadRequestError:
 *       description: Solicitud incorrecta o datos inválidos
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: 'Datos de entrada inválidos'
 *
 *     UnauthorizedError:
 *       description: No autorizado - Se requiere autenticación
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: 'No autorizado - Token inválido o expirado'
 *
 *     ForbiddenError:
 *       description: Prohibido - No tiene permisos para acceder al recurso
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: 'No tiene permisos para realizar esta acción'
 *
 *     NotFoundError:
 *       description: Recurso no encontrado
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: 'El recurso solicitado no fue encontrado'
 *
 *     ServerError:
 *       description: Error interno del servidor
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: 'Error interno del servidor'
 *
 *     ConflictError:
 *       description: Conflicto - La operación no se puede completar en el estado actual del recurso
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: 'No se puede realizar la operación en el estado actual del recurso'
 */
