const validateUser = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Bad request, missing username, email or password"
        })
    }
    next()
}
    
export default validateUser