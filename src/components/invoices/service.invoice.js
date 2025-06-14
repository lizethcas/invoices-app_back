import invoiceModel from "./models.invoices.js";
import mongoose from "mongoose";

// Función para obtener todas las facturas
const getAllInvoices = async () => {
    try {
        // Imprimir información de depuración
        console.log("Buscando todas las facturas en la base de datos");
        
        const invoices = await invoiceModel.find();
        console.log(`Se encontraron ${invoices.length} facturas`);
        
        return invoices;
    } catch (error) {
        console.error("Error al obtener todas las facturas:", error);
        throw error;
    }
}

// Función para obtener una factura por su ID
const getInvoiceById = async (id) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            console.log(`ID inválido: ${id}`);
            return null;
        }
        
        console.log(`Buscando factura con ID: ${id}`);
        const invoice = await invoiceModel.findById(id);
        
        if (invoice) {
            console.log("Factura encontrada:", invoice);
        } else {
            console.log("No se encontró ninguna factura con ese ID");
        }
        
        return invoice;
    } catch (error) {
        console.error(`Error al buscar factura con ID ${id}:`, error);
        throw error;
    }
}

const getInvoicesByCustomer = async (id) => {
    try {
        console.log(`Buscando facturas para el cliente con ID: ${id}`);
        const invoices = await invoiceModel.find({ customerId: id });
        if(!invoices){
            return null;
        }
        
        return invoices;
    } catch (error) {
        console.error(`Error al buscar facturas para el cliente con ID ${customer}:`, error);
        throw error;
    }
}
// Función para crear una nueva factura
const createInvoice = async (amount, status, id) => {
    try {
        const newInvoice = {
            customerId:  id, // Si no se proporciona un customer específico, usa el userId
            amount,
            status,
        };
        
        console.log("Creando nueva factura:", newInvoice);
        const createdInvoice = await invoiceModel.create(newInvoice);
        console.log("Factura creada exitosamente:", createdInvoice);
        
        return createdInvoice;
    } catch (error) {
        console.error("Error al crear factura:", error);
        throw error;
    }
};

// Función para eliminar una factura
const deleteInvoice = async (id) => {
    try {
        console.log(`Eliminando factura con ID: ${id}`);
        const deletedInvoice = await invoiceModel.findByIdAndDelete(id);
        
        return deletedInvoice;
    } catch (error) {
        console.error(`Error al eliminar factura con ID ${id}:`, error);
        throw error;
    }
}

// Función para actualizar una factura
const updateInvoice = async (id, amount, status) => {
    try {
        console.log(`Actualizando factura con ID: ${id}`);
        const updatedInvoice = await invoiceModel.findByIdAndUpdate(id, { amount, status }, { new: true });
        
        return updatedInvoice;
    } catch (error) {
        console.error(`Error al actualizar factura con ID ${id}:`, error);
        throw error;
    }
}   

export { getAllInvoices, getInvoiceById, getInvoicesByCustomer, createInvoice, deleteInvoice, updateInvoice }