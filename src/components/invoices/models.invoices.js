import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:false,
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
