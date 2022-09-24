const { Schema, model } = require("mongoose");

const schemaOrder = Schema({
  date: {
    type: Date,
    default: Date.now,
  },

  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },

      quantity: Number,
    },
  ],
  totalToPay: Number,

  client: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },

  finish: {
    type: Boolean,
    default: false,
  },
});

schemaOrder.methods.toJSON = function () {
  const { __v, _id, ...orders } = this.toObject();
  orders.id = _id;
  return orders;
};

module.exports = model("Order", schemaOrder);
