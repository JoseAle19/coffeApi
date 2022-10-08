const { request, response } = require("express");

const isFile = (req = request, res = response, next) => {
    const files = req.files
  if ( !files||  Object.keys(files).length < 1 || !files.file) {
    return res.status(400).json({
      status: false,    
      msg: "No hay imagen",
    });
  }
  next();
};

module.exports = {
  isFile,
};
