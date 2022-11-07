const { request, response } = require("express")
const jwt = require('jsonwebtoken')
const { User } = require("../models")


const readToken = async ( req = request, res = response) =>{
    const token = req.header('x-token')
    if (!token) {
        res.status(400).json({
            status: false,
        'message': 'Sin token especificado'
        })
    }


    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        const { name, rol, estado } = await User.findById(uid)

        if(!name){
            return res.status(401).json({
               status: false,
               msg: "Token no valido - el usuario no existe en la base de datos" 
            })
        }
        if(!estado){
            return res.status(401).json({
                status: false, 
                msg: "Token no valido, el usuario esta eliminado/desactivado"
            })
        }
        return res.status(200).json({
            status: true,
            'message': `Bienvenido ${name}`,
            rol
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Token no valido, code error 500"
        })
        
    }
}


module.exports = {
    readToken
}