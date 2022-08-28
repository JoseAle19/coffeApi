
const { response, request } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../helpers/generateJWT");






const login = async (req = request, res = response) => {
    const { password, email } = req.body;
    try {
        const user = await User.findOne({ email });
        //Verificar si eciste el email 
        if (!user) {
            return res.status(400).json(
                { msg: "Correo o contraseña incorrectos, correo" })
        }
        //Verificar si el estado del usuario esta activo
        if (!user.estado === true) {
            return res.status(400).json(
                { msg: "Correo o contraseña incorrectos, estado" })
        }
        //verificar contrasña
        const validatepass = bcrypt.compareSync(password, user.password);
        if (!validatepass) {
            return res.status(400).json(
                { msg: "Correo o contraseña incorrectos, contraseña" })

        }
        //generar token 
        
        const token = await generateToken(user.id);


        res.status(200).json({
            msg: "Login ok",
            // password,
            // email,
            user,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(400).json("Contacte al administrador") 
    }
}

module.exports = {
    login
}