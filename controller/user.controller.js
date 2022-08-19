
const { responsem, request } = require("express")


const userget = (req = request, res = response) => {
    const { q, page, limit, apikey, nombre } = req.query;
    res.json({
        msg: "get user controller",
        q,
        page,
        limit,
        apikey,
        nombre
    })

}

const userpost = (req = request, res) => {
    const { nombre, apellido } = req.body;

    res.json(
        {
            msg: "post user controller ",
            nombre,
            apellido

        })
}

const userput = (req, res) => {
    res.json("put user controller ")
}

const userdelete = (req, res) => {
    res.json("delete user controller")
}

module.exports = {
    userget, userput, userpost, userdelete
}