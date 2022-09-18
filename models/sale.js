const { Schema, model } = require("mongoose");

const schemaSale = () =>
  Schema({
    employe: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    sale: {

    },
  });
