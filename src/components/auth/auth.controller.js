
import jwt from "jsonwebtoken";
import {config} from "../../config/config.js";
import bcrypt from "bcrypt";
import serviceAuth from "./service.auth.js";

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
    try {
        // Asegurarse de que se reciban todos los campos necesarios
        const { username, email, password, role } = req.body;
        
        if (!username || !email || !password || !role) {
            return res.status(400).json({ 
                message: "Todos los campos son obligatorios",
                missingFields: { 
                    username: !username, 
                    email: !email, 
                    password: !password, 
                    role: !role 
                } 
            });
        }
        
        // Verificar si el usuario ya existe
        const existingUser = await serviceAuth.getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: "El usuario ya existe" });
        }
        
        // Crear el nuevo usuario
        const newUser = await serviceAuth.registerUser({
            username,
            email,
            password,
            role
        });
        
        // Generar token
        const token = generateToken(newUser);
        
        res.status(201).json({ 
            message: "Usuario registrado correctamente", 
            token, 
            user: userData(newUser)
        });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ 
            message: "Error al registrar usuario", 
            error: error.message 
        });
    }
};

export default {
    login,
    register
}
    