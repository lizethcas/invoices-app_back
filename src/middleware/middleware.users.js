const validateUser = (req, res, next) => {
    const { username, email, password, role } = req.body;
    
    // Validar campos obligatorios
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Bad request, missing username, email or password"
        });
    }
    
    // Validar y asignar role por defecto si no se proporciona
    if (!role) {
        req.body.role = 'user'; // Asignar valor por defecto
    } else if (role !== 'admin' && role !== 'user') {
        return res.status(400).json({
            message: "El rol debe ser 'admin' o 'user'"
        });
    }
    
    next();
}
    
export default validateUser