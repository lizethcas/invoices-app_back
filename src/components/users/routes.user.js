import express from "express";
import controllerUser from "./controller.user.js";
import filesController from "../files/files.controller.js";
import { verifyRole } from "../../middleware/middelware.auth.js";
import { upload, verifyFile, handleMulterError } from "../../middleware/files.middelware.js";

const router = express.Router();

// Configuración para múltiples archivos con límites
const multiUpload = upload.array("files", 5); // Máximo 5 archivos

// Rutas de usuarios
router.get("/", verifyRole, controllerUser.getAllUsers);
router.get("/profile",controllerUser.getUserProfile);
router.get("/:id", verifyRole, controllerUser.getUserById);

router.patch("/", controllerUser.patchUser);
router.patch("/:id", verifyRole, controllerUser.patchUser);



// Ruta para subir una sola imagen
router.post("/upload-user-image", upload.single("file"), handleMulterError, verifyFile, filesController.uploadUserImage);

// Ruta para subir múltiples imágenes
router.post("/upload-user-images", (req, res, next) => {
    multiUpload(req, res, (err) => {  
      if (err) {
        // Pasar el error al manejador de errores
        return handleMulterError(err, req, res, next);
      }
      next();
    });
  },
  filesController.uploadUserImages
);

// Otras rutas de usuarios
router.post("/", verifyRole, controllerUser.createUser);
router.delete("/:id", verifyRole, controllerUser.deleteUser);

export default router;