import express from "express";
import controllerInvoice from "./controller.invoices.js";
import validateInvoice from "../../middleware/middelware.invoices.js";

const router = express.Router();


router.get("/", controllerInvoice.getAllInvoices);
router.get("/:id", controllerInvoice.getInvoiceById);

/* rutas con validacion */
router.post("/", validateInvoice, controllerInvoice.createInvoice);
router.patch("/:id", controllerInvoice.updateInvoice);

router.delete("/:id", controllerInvoice.deleteInvoice);

router.get("/customer/:id", controllerInvoice.getInvoicesByCustomer);

export default router;
