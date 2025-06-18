import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import redis from "../config/redis.js";

const verifyToken = (req, res, next) => {

    const token = req.cookies.accessToken;
    console.log(token)

    if (!token) {
        return res.status(401).json({ message: "Unauthorizedd" });
    }

    try {
        jwt.verify(token, config.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

const verifyRefreshToken = async (req, res, next) => {

    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({ message: "Unauthorizedd", error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, config.REFRESH_TOKEN_SECRET)
        const expiredToken = await redis.get(`blacklist_refresh:${decoded.jti}`)
        if (expiredToken) return res.status(401).json({ message: "sesion vencida, por favor inicie sesion de nuevo" });
        
        console.log(decoded)
        req.decoded = decoded;
       

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", error: "Invalid token" });
    }
}

const verifyRole = (req, res, next) => {
    const { role } = req.user;
    if (role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
}

export { verifyToken, verifyRole, verifyRefreshToken };