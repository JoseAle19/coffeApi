const { Schema, model } = require("mongoose")



const userSchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre es requerido"]
    },


    email: {
        type: String,
        unique: true,
        required: [true, "El correo es requerido"]
    },


    password: {
        type: String,
        required: [true, "La contraseña es requerido"]
    },
    image: {
    },

    
    rol: {
        type: String,
        required: true,
        emun: ["Administrador", "usuario"]
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

})


userSchema.methods.toJSON = function () {
    const { _id, __v, password, ...user } = this.toObject()
    user.uid = _id
    return user;
}


module.exports = model("Usuario", userSchema);

//Por defecto mongo le da una (s) en el nombre de la colecion