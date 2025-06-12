
import jwt from "jsonwebtoken";
import {config} from "../../config/config.js";
import bcrypt from "bcrypt";
import serviceAuth from "./service.auth.js";
import controllerUser from "../users/controller.user.js";

const generateToken = (user) => {
    return jwt.sign(userData(user), config.SECRET_KEY, { expiresIn: "1h" });
}

const userData = (user) => {
    return {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await serviceAuth.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "Usuario y/o contraseña incorrectos" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Usuario y/o contraseña incorrectos" });
        }
        const token = generateToken(user);
        res.json({ message: "Login exitoso", user: userData(user), token });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
    }
};

const register = async (req, res) => {
  // Simplemente redirigimos la petición al controlador de usuarios
  return controllerUser.createUser(req, res);
}

export default {
    login,
    register
}
    