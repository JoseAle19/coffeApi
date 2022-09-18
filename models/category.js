const { Schema , model } = require("mongoose")



const categorySchema = Schema({
name:{
    type: String,
    required: [true, "El nombre de la categoria es obligatorio"]
},
status:{
    type: Boolean,
    default: true,
    required: true
},
user:{
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true 
}

})

categorySchema.methods.toJSON = function () {
    const {__v, ...categ}  = this.toObject() 
    return categ
}

module.exports = model("Category", categorySchema)