const { request, response } = require("express");
const { Sale, Order, Product } = require("../models");

const saleOrder = async (req = request, res = response) => {

  const saleorder = await Order.findById(req.params.orderid);

  for (let i = 0; i < saleorder.products.length; i++) {
    const saleproduct = await Product.findById(saleorder.products[i].productId)
const newstok = saleproduct.stock - saleorder.products[i].quantity


await Product.findByIdAndUpdate(saleorder.products[i].productId, {stock: newstok})
  }

  await Order.findByIdAndUpdate(req.params.orderid, {finish: true})
  const data = {
    employe: req.userAuth,
    order: req.params.orderid,
  };

  const orderSale = new Sale(data);



  await orderSale.save();  


  res.status(200).json({
    msg: "Datos del pedido",
    order: orderSale,

  });
};


module.exports = {
  saleOrder,
};
