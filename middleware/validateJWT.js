const { request, response, json } = require("express");
const jwt = require("jsonwebtoken")

const User = require("../models/user")



const validateJWT = async (req = request, res = response, next) => {
    const token = req.header("x-token")
    console.log(`Este es el token ${token}`);
    if (!token) {
        return res.status(400).json({
            status: false,
            msg: "No token especificado"
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
const user = await  User.findById(uid)
if(!user){
    return res.status(401).json({
       status: false,
       msg: "Token no valido - el usuario no existe en la base de datos" 
    })
}
if(!user.estado){
    return res.status(401).json({
        status: false, 
        msg: "Token no valido, el usuario esta eliminado/desactivado"
    })
}
//la palabra userAuth es un nuevo valor para el objeto y se podra  acceder con el mismo nombre userAuth 
// y userAuth contiene el usuario con si token  
req.userAuth = user
        next() 
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: "Token no valido"
        })
    }

}



module.exports = {
    validateJWT
}