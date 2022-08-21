
const { response, request } = require("express")
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const userget = async (req = request, res = response) => {
    const query = { estado: true }
    const { limit = 5, desde = 0 } = req.query;


    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query).limit(Number(limit)).skip(Number(desde))
    ])
    res.json({
        total, users
    })

}

const userpost = async (req = request, res = response) => {

    const { name, email, password, rol, google } = req.body;

    const user = new User({ name, email, password, rol, google });


    //verificar si el correo existe

    //encriptar contraseña

    const salt = bcrypt.genSaltSync();
    //Este metod genSaltSync tiene por defecto 10 saltos
    user.password = bcrypt.hashSync(password, salt)

    await user.save();
    res.json(
        {
            msg: "post user controller ",
            user

        })
}

const userput = async (req = request, res = response) => {


    const { userid } = req.params;
    const { _id, password, google, email, ...userrest } = req.body;
    if (password) {
        const salt = bcrypt.genSaltSync();
        userrest.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(userid, userrest)



    res.json({
        msg: "User put",
        user
    })
}

const userdelete = async (req, res) => {

    const { userid } = req.params;
    const user = await User.findByIdAndUpdate(userid, { estado: false });

    res.json({
        msg: `Datos del usuario con el id ${userid}`,
        user,
    })
}

module.exports = {
    userget, userput, userpost, userdelete
}