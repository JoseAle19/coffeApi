const { Schema, model } = require("mongoose");

const productSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre del producto es obligatorio"],
  },
  status: {
    type: String,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: {
    type: String,
  },

  available: {
    type: Boolean,
    default: true,
  },

  stock: {
    type: Number,
    default: 1, 
    required: [true, "Ingresa la cantidad de productos"]
  },
});

productSchema.methods.toJSON = function () {
  const { __v, status, ...product } = this.toObject();
  return product;
};

module.exports = model("Product", productSchema);
