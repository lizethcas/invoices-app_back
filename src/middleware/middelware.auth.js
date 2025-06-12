import jwt from "jsonwebtoken";
import {config} from "../config/config.js";

const verifyToken = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, config.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    });
}

const verifyRole = (req, res, next) => {
    const { role } = req.user;
    if (role !== "admin") {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
}

export { verifyToken, verifyRole };