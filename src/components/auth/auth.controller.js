
import jwt from "jsonwebtoken";
import { config } from "../../config/config.js";
import bcrypt from "bcrypt";
import serviceAuth from "./service.auth.js";    
import controllerUser from "../users/controller.user.js";
import redis from "../../config/redis.js";
import { v4 as uuidv4 } from 'uuid';

const generateTokens = async (user) => {
    const refreshTokenJti = uuidv4();
    const accessToken = jwt.sign(user, config.SECRET_KEY, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ user, jti: refreshTokenJti }, config.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    await redis.set(`refresh:${refreshTokenJti}`,refreshToken, 'EX', 60 * 60 * 24 * 7)
    return { accessToken, refreshToken };
}


const gerateCookie = (res, token, type) => {
    res.cookie(type, token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict',
        maxAge: type == 'refreshToken'? 7 * 24 * 60 * 60 * 1000 : 60*15*1000
    });

}

const addBlackList = async (jti,exp)=>{
    const ttl = parseInt(exp) - parseInt(Date.now() / 1000)
    if(ttl > 0) await redis.set(`blacklist_refresh:${jti}`, 'revoked', 'EX', ttl)
    await redis.del(`refresh:${jti}`, 'revoked')
}

export const userData = (user) => {
    return {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        user_profile: user.user_image
    }
}

const logout =async(req,res)=>{
    
    await addBlackList(req.decoded.jti,req.decoded.exp)
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logout exitoso" });

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
        const userFormat = userData(user)
        const token = await generateTokens(userFormat);
        gerateCookie(res,token.accessToken,'accessToken')
        gerateCookie(res,token.refreshToken,'refreshToken')
        res.json({ message: "Login exitoso",  user: userFormat });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
    }
};

const register =  async(req, res) => {
    return await controllerUser.createUser(req, res);
    
}
const refreshToken = async (req, res)=>{
    const user = req.decoded.user
   
    await addBlackList(req.decoded.jti,req.decoded.exp)
    try {
        const token = await generateTokens(user);
       
        gerateCookie(res, token.accessToken, 'accessToken');
        gerateCookie(res, token.refreshToken, 'refreshToken');
        
        res.status(200).json({ 
            message: "Token actualizado correctamente", 
            user: userData(user) 
        });
    } catch(err) {
        console.error('Error en refreshToken:', err);
        res.status(500).json({ 
            message: "Error al generar nuevo token", 
            error: err.message 
        });
    }

}

export default {
    login,
    register,
    refreshToken,   
    logout
}
