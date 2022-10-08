const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const { request, response } = require("express");
const { model } = require("mongoose");
const { uploadFile } = require("../helpers");
const { User, Product } = require("../models");

const updateImage = async (req = request, res = response) => {
  const { collections, id } = req.params;
  let model;
  switch (collections) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe el usuario con el id ${id} `,
        });
      }

      break;

    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe el producto con el id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({
        msg: "Error el el backend",
      });
  }
  if (model.image) {
    const pathImage = path.join(__dirname, "../uploads", model.image);
    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage);
    }
  }

  model.image = await uploadFile(req.files);
  model.save();

  return res.status(201).json({
    model,
  });
};

const updateImageCloudinary = async (req = request, res = response) => {
  const { collections, id } = req.params;
  let model;
  switch (collections) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe el usuario con el id ${id} `,
        });
      }
      break;

    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe el producto con el id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({
        msg: "Error el el backend",
      });
  }
  if (model.image) {
    const imageCloudinary = model.image.split("/");
    const nameImage = imageCloudinary[imageCloudinary.length - 1];
    const [id] = nameImage.split(".");
    await cloudinary.uploader.destroy(id);
  }

  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  model.image = secure_url;
  model.save();

  return res.status(201).json({
    model,
  });
};

const getImages = async (req = request, res = response) => {
  const { id, collections } = req.params;
  let model;
  switch (collections) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe el usuario con el id ${id}`,
        });
      }
      break;

    case "products":
      model = await Product.findById(id);

      if (!model) {
        return res.status(400).json({
          status: false,
          msg: `No exist el producto con el id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({
        status: false,
        msg: "Error con el servidor",
      });
  }
  if (model.image) {
    const pathImage = path.join(__dirname, "../uploads", model.image);
    if (fs.existsSync(pathImage)) {
      return res.sendFile(pathImage);
    }
  }

  return res.json({
    msg: "Falta place holder",
  });
};
module.exports = {
  updateImage,
  getImages,
  updateImageCloudinary,
};
