import * as serviceInvoice from "./service.invoice.js";

/**
 * @module invoices
 * @description Controlador de facturas
 * 
*/

/**
 * @function getAllInvoices
 
 * obterner todas las facturas
 * - obtener el id y el role del usuario autenticado
 * - si el role es admin, obtener todas las facturas
 * - si el role es user, obtener solo las facturas del usuario autenticado
 * 
 * @memberof module:invoices
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 * 
 * @returns {Object} - Objeto de respuesta con las facturas encontrads
 * 
*/
const getAllInvoices = async (req, res) => {
    const { role, id } = req.decoded
    console.log(req.decoded)

    try {
        if (role === "admin") {
            const invoices = await serviceInvoice.getAllInvoices();
            return res.status(200).json({ data: invoices });
        }
        const invoices = await serviceInvoice.getInvoicesByCustomer(id);
        return res.status(200).json({ data: invoices });
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener las facturas", error: error.message });
    }
}

const getInvoicesByCustomer = async (req, res) => {
    const {id} = req.params
    try {
        const invoices = await serviceInvoice.getInvoicesByCustomer(id);
        return res.status(200).json({ data: invoices });
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener las facturas", error: error.message });
    }

}

const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await serviceInvoice.getInvoiceById(id);
        if (invoice) {
            return res.status(200).json({ message: "ok", data: invoice });
        }
        return res.status(404).json({ message: "invoice not found" });
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener la factura", error: error.message });
    }
}



const createInvoice = async (req, res) => {
    const { id } = req.decoded
    try {
        // Pasamos el id del usuario autenticado como userId para la factura
        const newInvoice = await serviceInvoice.createInvoice(req.body, id);
        return res.status(201).json({ message: "Factura creada exitosamente", data: newInvoice });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear la factura", error: error.message });
    }
};


const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await serviceInvoice.deleteInvoice(id);
        if (invoice) {
            return res.status(200).json({ message: "Factura eliminada exitosamente", data: invoice });
        }
        return res.status(404).json({ message: "invoice not found" });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar la factura", error: error.message });
    }
}

const updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;
        console.log(data)
        const invoice = await serviceInvoice.updateInvoice(id, data);
        if (invoice) {
            return res.status(200).json({ message: "Factura actualizada exitosamente", data: invoice });
        }
        return res.status(404).json({ message: "invoice not found" });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar la factura", error: error.message });
    }
}
export default { getAllInvoices, getInvoiceById, createInvoice, deleteInvoice, updateInvoice, getInvoicesByCustomer }