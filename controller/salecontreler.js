const { request, response } = require("express");
const { Sale, Order } = require("../models");

const saleOrder = async (req = request, res = response) => {
  const saleorder = await Order.findById(req.params.orderid);
  saleOrder.finish = true;
  const data = {
    employe: req.userAuth,
    order: req.params.orderid,
  };

  const orderSale = new Sale(data);
  await orderSale.save();

  const updateOrder = await Order.findByIdAndUpdate(req.params.orderid, { finish: true }, {new: true});

  res.status(200).json({
    msg: "Datos del pedido",
    order: orderSale,

  });
};

module.exports = {
  saleOrder,
};
