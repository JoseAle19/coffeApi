
const { validationResult } = require("express-validator");

//Este valida obtiene todos los valores
const validationfields = (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({
            status: false,
            err,
        })
    }
next();
}


module.exports = {
    validationfields
}