const { Schema, model } = require("mongoose");

const saleSchema = Schema({
  employe: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    require: [true, "Se necesita ser un usuario de la aplicacion"]
  },

  order: {
    type: Schema.Types.ObjectId,
    ref: "Order"
  },

  date: {
    type: Date,
    default: Date.now,
  },
   
  total: Number
});

module.exports = model("Sale", saleSchema);
