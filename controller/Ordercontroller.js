const { request, response } = require("express");
const { Order, Product, User } = require("../models");
const { sendEmailOrder } = require("../sendemail/sendemail");
const getOrders = async (req = request, res = response) => {
  const { date } = req.query;
  const countDocuments = await Order.countDocuments();
  const getOrders = await Order.find().populate("client", "name");

  res.status(200).json({
    status: true,
    orders: countDocuments,
    msg: "Peedidos  realizadas",
    listOrders: getOrders,
  });
};
const OrderProduct = async (req = request, res = response) => {
  const { dataProducts } = req.body;
  let totalToPay = 0;
  for (let i = 0; i < dataProducts.length; i++) {
    const foundProduct = await Product.findById(dataProducts[i].productId);

    const total = foundProduct.price * dataProducts[i].quantity;
    totalToPay += total;
  }
  const data = {
    products: dataProducts,
    totalToPay,
    client: req.userAuth.id,
  };
  const productOrder = new Order(data);
  // await productOrder.save();
  const { email, name } = await User.findById(req.userAuth.id);

  console.log(productOrder.id);

  sendEmailOrder(email, name, productOrder.id);

  res.status(200).json({
    status: true,
    msg: "Datos de la venta realizada",
    productOrder,
  });
};
module.exports = {
  OrderProduct,
  getOrders,
};
