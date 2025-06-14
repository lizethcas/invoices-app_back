import mongoose from "mongoose";

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
