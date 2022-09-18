
const { response, request } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/verify_google");
const user = require("../models/user");






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
            status: true,
            msg: "Bienvenido",
            user,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(400).json("Contacte al administrador")
    }
}


const googleSingIn = async (req = request, res = response) => {

    const { id_token } = req.body;

    try {

        const { name, email, img } = await googleVerify(id_token)


        let usergoogle = await User.findOne({ email })
        if (!usergoogle) {
            const data = {
                name,
                email,
                password: ":p",
                image: img,
                rol: "user",
                google: true
            }
            usergoogle = new User(data)
            await usergoogle.save();
        }

        if (!usergoogle.estado) {
           return  res.status(401).json({
                success: false,
                msg: "Hable con el administrador, usuario-bloqueado"
            })
        }


        const token = await generateToken(usergoogle.uid)
        return res.json({
            status: true,
            msg: "Todo ok",
            token,
            usergoogle

        })

    } catch (err) {
        console.log("Error -------------------------->  " + err);
    }
}




module.exports = {
    login,
    googleSingIn
}