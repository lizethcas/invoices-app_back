import * as serviceInvoice from "./service.invoice.js";

const getAllInvoices = async (req, res, next) => {
    try {
        const invoices = await serviceInvoice.getAllInvoices();
        return res.status(200).json({data: invoices});
    } catch (error) {
        next(error);
    }
}

const getInvoiceById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const invoice = await serviceInvoice.getInvoiceById(id);
        if (invoice) {
            return res.status(200).json({message: "ok", data: invoice});
        }
        return res.status(404).json({message: "invoice not found"});
    } catch (error) {
        next(error);
    }
}


const createInvoice = async (req, res) => {
    try {
        const { amount, status } = req.body;
        const newInvoice = await serviceInvoice.createInvoice(amount, status);
        return res.status(201).json({message: "Factura creada exitosamente", data: newInvoice});
    } catch (error) {
        return res.status(500).json({message: "Error al crear la factura", error: error.message});
    }
};


const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await serviceInvoice.deleteInvoice(id);
        if (invoice) {
            return res.status(200).json({message: "Factura eliminada exitosamente", data: invoice});
        } 
        return res.status(404).json({message: "invoice not found"});
    } catch (error) {
        next(error);
    }
}

const updateInvoice = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { amount, status } = req.body;
        const invoice = await serviceInvoice.updateInvoice(id, amount, status);
        if (invoice) {
            return res.status(200).json({message: "Factura actualizada exitosamente", data: invoice});
        } 
        return res.status(404).json({message: "invoice not found"});
    } catch (error) {
        next(error);
    }
}
export default { getAllInvoices, getInvoiceById, createInvoice, deleteInvoice, updateInvoice }