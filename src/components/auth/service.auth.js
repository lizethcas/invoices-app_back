import User from "../users/model.user.js";

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ where: { email } });
        return user;
    } catch (error) {
        throw error;
    }
}

export default {
    getUserByEmail
}
    
    