import express from "express";
import controllerUser from "./controller.user.js";
import validateUser from "../../middleware/middleware.users.js";

const router = express.Router();

router.get("/", controllerUser.getAllUsers);
router.get("/:id", controllerUser.getUserById);

router.post("/", validateUser, controllerUser.createUser);
router.delete("/:id", controllerUser.deleteUser);
    

export default router