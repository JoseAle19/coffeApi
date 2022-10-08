const { response, request } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { findById } = require("../models/user");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const userget = async (req = request, res = response) => {
  const query = { estado: true };
  const { limit = 5, desde = 0 } = req.query;

  const [total, users] = await Promise.all([
    User.countDocuments(query),

    User.find(query).limit(Number(limit)).skip(Number(desde)),
  ]);
  res.status(200).json({
    status: true,
    msg: "Listado de usuarios",
    total,
    users,
  });
};

const userpost = async (req = request, res = response) => {
  const { name, email, password, rol, google } = req.body;
  //* Subir imagen a cloudinary
  const { file } = req.files;

  const { tempFilePath } = file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  const image = secure_url;

  const user = new User({
    name,
    email,
    password,
    rol,
    google,
    image,
  });

  const salt = bcrypt.genSaltSync();
  //Este metod genSaltSync tiene por defecto 10 saltos
  user.password = bcrypt.hashSync(password, salt);

  await user.save();
  res.status(201).json({
    status: true,
    msg: "Usuario creado",
    user,
  });
};

const userput = async (req = request, res = response) => {
  const { userid } = req.params;
  const { _id, password, google, email, ...userrest } = req.body;
  const { file } = req.files;

  if (password) {
    const salt = bcrypt.genSaltSync();
    userrest.password = bcrypt.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(userid, userrest, {
    new: true,
  });
  const userImage = await User.findById(userid);

  if (userImage.image.length > 0) {
    const imageCloudinary = userImage.image.split("/");
    const nameImage = imageCloudinary[imageCloudinary.length - 1];
    const [id] = nameImage.split(".");
    await cloudinary.uploader.destroy(id);
  }

  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  userImage.image = secure_url;
  userImage.save();

  res.status(201).json({
    status: true,
    msg: "Usuario actualizado",
    user,
  });
};

const userdelete = async (req, res) => {
  const { userid } = req.params;
  const user = await User.findByIdAndUpdate(userid, { estado: false });

  const userau = req.userAuth;

  res.json({
    msg: `Datos del usuario eliminado con el id ${userid}`,
    user,
  });
};

module.exports = {
  userget,
  userput,
  userpost,
  userdelete,
};
