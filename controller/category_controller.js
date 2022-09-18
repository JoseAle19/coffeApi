const { request, response } = require("express");
const { Promise } = require("mongoose");
const Category = require("../models/category");
const User = require("../models/user");
const getCategorys = async (req = request, res = response) => {
  const query = { status: true };
  const { limit = 5, desde = 0 } = req.query;

  const [total, categorys, all] = await Promise.all([
    Category.countDocuments(),

    Category.find({status: true})
      .limit(Number(limit))
      .skip(Number(desde))
      .populate("user", "name"),
    // el populate hace referencia al campo del schema que se creo en este ejemplo es (user)
    //por que asi esta en el schema de categorias
    Category.find()
  ]);
  res.json({
    total,
    categorys,
  });
};

const getCategory = async (req = request, res = response) => {
  const { id } = req.params;

  const category = await Category.findById({ _id: id }).populate(
    "user",
    "name"
  );

  return res.status(200).json({
    status: true,
    msg: "Nombre de la categoria",
    category,
  });
};

const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();
  const categoryDB = await Category.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      status: false,
      msg: `La categoria ${name} ya existe`,
    });
  }

  const data = {
    name,
    user: req.userAuth._id,
  };

  const category = new Category(data);

  await category.save();
  return res.status(201).json({
    status: true,
    msg: "Categoria agregada/creada",
  });
};

const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;

  const name = req.body.name.toUpperCase();

  const namecateg = await Category.findOne({ name });

  if (namecateg) {
    return res.status(400).json({
      status: false,
      msg: `Categoria ${namecateg.name} ya existe en la base de datos`,
    });
  }
  const categoryUpdate = await Category.findByIdAndUpdate(
    id,
    { name, status: true, user: req.userAuth._id },
    { new: true } //? Este new lo que hace es que en la respuesta, muestra el nuevo valor actualizado del body
  );

  res.status(201).json({
    status: true,
    msg: "Categoria actualizada",
    categoryUpdate,
  });
};

const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;

  const deletecateg = await Category.findByIdAndUpdate(id, { status: false });

  res.status(200).json({
    status: true,
    msg: `Categoria  ${deletecateg.name} eliminada`,
  });
};

module.exports = {
  createCategory,
  getCategorys,
  getCategory,
  updateCategory,
  deleteCategory,
};
