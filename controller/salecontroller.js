const { request, response } = require("express");
const { Sale, Order, Product } = require("../models");
const order = require("../models/order");
const sale = require("../models/sale");

const finishOrder = async (req = request, res = response) => {
  const { orderid } = req.params;
  const { finish } = await Order.findByIdAndUpdate(
    orderid,
    { finish: true },
    { new: true }
  );
  const { id } = req.userAuth;
  console.log(`Token de usuario ${id}`);

  const dataSale = {
    employe: id,
    order: orderid,
  };
  const sale = new Sale(dataSale);

  sale.save();

  return res.status(200).json({
    status: true,
    message: "Pedido finalizado",
    statusOrder: finish,
    sale: sale,
  });
};
 

module.exports = {
  finishOrder,
};
