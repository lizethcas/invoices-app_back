import * as serviceUser from "./service.user.js";
import { userData } from "../auth/auth.controller.js";

const getAllUsers = async (req, res, next) => {
    try {
        const users = await serviceUser.getAllUsers();
        res.status(200).json({
            message: "ok",
            data: users.map(user => userData(user))
        });
    } catch (error) {
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await serviceUser.getUserById(id);
        if (user) {
            return res.status(200).json({ message: "ok", data: userData(user) });
        }
        return res.status(404).json({ message: "user not found" });
    } catch (error) {
        next(error);
    }
}

const createUser = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;

        const newUser = await serviceUser.createUser(username, email, password, role);


        if (newUser) {
            return res.status(201).json({ message: "User created successfully", data: userData(newUser) });
        }
        return res.status(400).json({ message: "User already exists" });
    } catch (error) {
        next(error);
    }
}


const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await serviceUser.deleteUser(id);
        if (user) {
            return res.status(200).json({ message: "User deleted successfully", data: userData(user) });
        }
        return res.status(404).json({ message: "User not found" });
    } catch (error) {
        next(error);
    }
}

export default { getAllUsers, getUserById, createUser, deleteUser }