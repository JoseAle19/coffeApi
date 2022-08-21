
const { validationResult } = require("express-validator");

//Este valida obtiene todos los valores
const validationUser = (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        console.log("Entra a esta validacio");
        return res.status(400).json({
            err,
            msg: `Error el crear cuenta de usuario`
        })
    }
next();
}


module.exports = {
    validationUser
}