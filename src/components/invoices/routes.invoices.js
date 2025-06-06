import express from "express";
import controllerInvoice from "./controller.invoices.js";
import validateInvoice from "../../middleware/middelware.invoices.js";

const router = express.Router();

router.get("/", controllerInvoice.getAllInvoices);
router.get("/:id", controllerInvoice.getInvoiceById);

/* rutas con validacion */
router.post("/", validateInvoice, controllerInvoice.createInvoice);
router.put("/:id", validateInvoice, controllerInvoice.updateInvoice);
router.delete("/:id", controllerInvoice.deleteInvoice);

export default router;
