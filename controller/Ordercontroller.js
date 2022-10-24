const { request, response } = require("express");
const { Order, Product, User } = require("../models");
const { sendEmailOrder } = require("../sendemail/sendemail");
const getOrders = async (req = request, res = response) => {
  const query = {
    finish: false,
  };

  const countDocuments = await Order.countDocuments(query);
  const getOrders = await Order.find(query).populate("client");
  res.status(200).json({
    status: true,
    msg: "Todos los pedidos",
    orders: countDocuments,
    listOrders: getOrders,
    // quantityProducts: products.length
  });
};
const orderProduct = async (req = request, res = response) => {
  const { dataProducts } = req.body;

  let totalToPay = 0;

  for (let i = 0; i < dataProducts.length; i++) {
    const foundProduct = await Product.findById(dataProducts[i].productId);

    if (foundProduct.stock < dataProducts[i].quantity) {
      return res.status(400).json({
        status: false,
        msg: "No hay los productos en existencia",
      });
    }

    const newStock = foundProduct.stock - dataProducts[i].quantity;
    const updateStockProduct = await Product.findByIdAndUpdate(
      dataProducts[i].productId,
      { stock: newStock, finish: false },
      { new: true }
    );

    const total = foundProduct.price * dataProducts[i].quantity;
    totalToPay += total;
  }
  const data = {
    products: dataProducts,
    totalToPay,
    client: req.userAuth.id,
  };

  const productOrder = new Order(data);
  await productOrder.save();
  const { email, name } = await User.findById(req.userAuth.id);

  // sendEmailOrder(email, name, productOrder.id);

  res.status(200).json({
    status: true,
    msg: "Datos del pedido",
    productOrder,
  });
};

const deleteOrder = async (req = request, res = response) => {
  const { orderid } = req.params;

  const order = await Order.findById(orderid);

  const { products } = order;
  let productNewStock;
  for (let i = 0; i < products.length; i++) {
    const product = await Product.findById(products[i].productId);
    const updateStock = product.stock + products[i].quantity;

    productNewStock = await Product.findByIdAndUpdate(
      products[i].productId,
      { stock: updateStock },
      { new: true }
    );
  }
  await Order.findByIdAndDelete(orderid);

  return res.status(200).json({
    status: true,
    newStock: productNewStock,
  });
};

module.exports = {
  orderProduct,
  getOrders,
  deleteOrder,
};
