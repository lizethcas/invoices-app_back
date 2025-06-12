import user from "./model.user.js";


const getAllUsers = async() => {
    try {
        const result = await user.findAll();
        return result;
    } catch (error) {
        throw error;
    }
}

const getUserById = async(id) => {
    try {
        const result = await user.findByPk(id);
        
        if (result) {
            return result;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

const createUser = async(username, email, password, role) => {
    try {
        // Primero verificamos si ya existe un usuario con ese email
        const existingUser = await user.findOne({ where: { email } });
        
        if (existingUser) {
            return null; // Usuario ya existe
        }
        // Si no existe, lo creamos
        const result = await user.create({ username, email, password, role });
        return result;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
}
const deleteUser = async(id) => {
    try {
        const result = await user.destroy({ where: { id } });
        return result;
    } catch (error) {
        throw error;
    }
}

export { getAllUsers, getUserById, createUser, deleteUser }