const { request, response } = require("express");

const isFile = (req = request, res = response, next) => {
  const files = req.files;
  if (!files) {
    req.files = {
      file: "https://upload.wikimedia.org/wikipedia/commons/6/66/Sin_datos.jpg",
    };
  }
  next()
};

module.exports = {
  isFile,
};
