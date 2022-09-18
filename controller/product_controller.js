const { request, response } = require("express");
const { Promise } = require("mongoose");
const { Product } = require(`../models`);
const createProduct = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();
  const { status, ...product } = req.body;

  const existProduct = await Product.findOne({ name });

  if (existProduct) {
    return res.status(400).json({
      status: false,
      msg: `El producto ${name} ya existe`,
    });
  }

  const data = {
    name,
    user: req.userAuth._id,
    price: product.price,
    category: product.category,
    description: product.description,
    stock: product.stock,
  };

  const postProduct = new Product(data);

  postProduct.save();

  res.status(201).json({
    status: false,
    msg: "Producto craeado",
    postProduct,
  });
};

const getProducts = async (req = request, res = response) => {
  const query = { status: true };

  const [countDocs, products] = await Promise.all([
    Product.find(query).countDocuments(),
    Product.find(query).populate("category", "name").populate("user", "name"),
  ]);

  if (countDocs <= 0) {
    return res.status(400).json({
      msg: "No cuentas con productos",
    });
  }
  res.status(200).json({
    status: true,
    msg: "Productos",
    countDocs,
    products,
  });
};

const getProductsById = async (req = request, res = response) => {
  const { id } = req.params;

  const [productById] = await Promise.all([
    Product.findById(id).populate(`user`, `name`).populate(`category`, `name`),
  ]);

  res.status(200).json({
    status: true,
    msg: `Datos obtenidos`,
    productById,
  });
};

const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { status, category, user, ...produ } = req.body;
  produ.user = req.userAuth._id;

  const product = await Product.findByIdAndUpdate(id, produ, { new: true });
  product.save();

  res.status(200).json({
    status: true,
    msg: "Producto actualizado",
    product,
  });
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;

  const productDelete = await Product.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  res.status(201).json({
    status: true,
    msg: `Producto con el id ${id} se a eliminado`,
    productDelete,
  });
};

const deleteQuantityProduct = async (req = request, res = response) => {
  const { dataProduct } = req.body;
  let successOrder;
  for (let i = 0; i < dataProduct.length; i++) {
    const quantityProducts = await Product.findById(dataProduct[i].productId);

    if (quantityProducts.stock < 1) {
      res.status(400).json({
        status: false,
        msg: "No hay la cantidad disponible",
      });
    }

    const newStock = quantityProducts.stock - dataProduct[i].quantity;

    successOrder = await Product.findByIdAndUpdate(
      quantityProducts.id,
      {
        stock: newStock,
      },
      { new: true }
    );
  }

  res.status(200).json({
    status: true,
    msg: "Venta realizada",
  });

 
};

module.exports = {
  createProduct,
  getProducts,
  getProductsById,
  updateProduct,
  deleteProduct,
  deleteQuantityProduct,
};
