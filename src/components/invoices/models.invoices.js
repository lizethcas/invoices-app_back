import mongoose from "mongoose";


/**
 * @swagger
 * components:
 *  schemas:
 *      Invoice:
 *          type: object
 *          properties:
 *              customerId:
 *                  type: number
 *                  description: ID del cliente
 *              amount:
 *                  type: number
 *                  description: Monto de la factura
 *              status:
 *                  type: string
 *                  description: Estado de la factura
 *                  enum: ["pending","paid","draft"]
 *              createdAt:
 *                  type: string
 *                  format: date-time
 *                  description: Fecha de creación de la factura
 *          required:
 *              - customerId
 *              - amount
 *              - status
 *          example:
 *              customerId: 1
 *              amount: 100
 *              status: pending
 * 
 */

const invoiceSchema = new mongoose.Schema({
    customerId :{
        type:Number,
        required:true,
        comment: "ID del usuario que creó la factura"
    },
    amount:{
        type:Number,
        required:true,
        min:50
    },
    status:{
        type:String,
        enum:["pending","paid","draft"],
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
}, {
    versionKey:false
})

const invoiceModel = mongoose.model("Invoice",invoiceSchema)

export default invoiceModel
