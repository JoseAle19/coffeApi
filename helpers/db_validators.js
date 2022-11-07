const { Category, User, Product, Rol, Order } = require("../models");
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

const existProductInBd = async (name)=>{
const existProductBd = await Product.findOne({name: name.toUpperCase()});
  if (existProductBd) {
    throw new Error(`El producto ${name} ya existe`);
  }
}


const existOrder = async (id) => {
  const existOrder = await Order.findById(id);
  if (!existOrder) {
    throw new Error(`El pedido con el id: ${id} no existe `);
  }
};
const orderIdfinish = async (id) => {
  const existOrder = await Order.findById(id);
  if (existOrder.finish === true) {
    throw new Error(`Este pedido con el id ${id} ya esta finalizado`);
  }
};

const validateCollections = (collections, next) => {
  const collectionsarray = ["users", "products"];

  const collectionsValid = collectionsarray.includes(collections);

  if (!collectionsValid) {
    throw new Error("La coleccion no existe");
  }
  return true;
};

module.exports = {
  validatorRol,
  existEmail,
  userExistById,
  categoryExistById,
  existProduct,
  existOrder,
  orderIdfinish,
  validateCollections,
  existProductInBd
};
