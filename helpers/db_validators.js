const Role = require("../models/rol");
const user = require("../models/user");
const User = require("../models/user")


const validatorRol = async (role = "") => {
    const existRol = await Role.findOne({ role });
    if (!existRol) {
        throw new Error(`El rol ${role} no esta registrado`);
    }
}



const existEmail = async (email = "") => {
    const existmail = await User.findOne({ email: email });
    if (existmail) {
        //El status(400) es un bad request
        throw new Error(`El correo ${email} ya existe`);
    }
}

const userExistById =  async  (userid) => {
    const existUser = await User.findById( userid);
    if (!existUser) {
        //El status(400) es un bad request
        throw new Error(`El usuario con el id: ${userid} no existe `);
    }
}


module.exports = {
    validatorRol, existEmail, userExistById
}