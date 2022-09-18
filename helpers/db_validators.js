// const Role = require("../models/rol");
// const User = require("../models/user")
// const Category = require("../models/category")
//Este es una prueba de hacer un token de encriptacion
const { Category, User, Product, Rol } = require("../models");
const jwt = require("jsonwebtoken");

const validatorRol = async (role = "") => {
  const existRol = await Rol.findOne({ role });
  if (!existRol) {
    throw new Error(`El rol ${role} no esta registrado`);
  }
};

const existEmail = async (email = "") => {
  const existmail = await User.findOne({ email: email });
  if (existmail) {
    //El status(400) es un bad request
    throw new Error(`El correo ${email} ya existe`);
  }
};

const userExistById = async (userid) => {
  const existUser = await User.findById(userid);
  if (!existUser) {
    //El status(400) es un bad request
    throw new Error(`El usuario con el id: ${userid} no existe `);
  }
};

const categoryExistById = async (id) => {
  const existCategory = await Category.findById(id);
  if (!existCategory) {
    //El status(400) es un bad request
    throw new Error(`La categoria  con el id: ${id} no existe `);
  }
};

const existProduct = async (id) => {
  const existProduct = await Product.findById(id);
  if (!existProduct) {
    throw new Error(`El producto con el id: ${id} no existe `);
  }
};

module.exports = {
  validatorRol,
  existEmail,
  userExistById,
  categoryExistById,
  existProduct,
};
