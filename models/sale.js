const { Schema, model } = require("mongoose");

const saleSchema = Schema({
  employe: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    require: [true, "Para realizar ser un usuario"]
  },

  order: {
    type: Schema.Types.ObjectId,
    ref: "Order"
  },
});

module.exports = model("Sale", saleSchema);
