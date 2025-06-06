const validateInvoice = (req, res, next) => {
    const { amount, status } = req.body;
    if (!amount) {
        return res.status(400).json({
            message: "Bad request, missing amount"
        })
    }
    if(amount <= 0){
        return res.status(400).json({
            message: "Bad request, amount must be greater than 0"
        })
    }
    if(!status || !['pending', 'paid','draft'].includes(status)){
        return res.status(400).json({
            message: "Bad request, status must be pending, paid or draft"
        })
    }
    next()
}

export default validateInvoice;
