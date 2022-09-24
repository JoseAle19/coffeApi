const { response, request } = require("express")



const validateROL = (req = request, res = response, next) => {

    if (!req.userAuth) {
        return res.status(401).json({
            status: false,
            msg: "Se quiere validar rol antes del token"
        })
    }



    const { rol, name } = req.userAuth;

    if (rol !== "administrador") {
        res.status(401).json({
            status: false,
            msg: `${name} no es administrador`
        })
    }

    next()

}




// los tre puntitos (...) sirve para obtener el resto de los argumentos
const hasARole = (...roles) => {
    return (req = request, res = response, next) => {


        if (!req.userAuth) {
            return res.status(501).json({
                status: false,
                msg: "Se quiere validar rol antes del token"
            })
        }

        if (!roles.includes(req.userAuth.rol)) {
            return res.status(401).json({
                status: false,
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }
next()

    }
}


module.exports = {
    validateROL,
    hasARole
}