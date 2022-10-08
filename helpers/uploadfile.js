const path = require("path");

const { v4: uuidv4 } = require("uuid");

const uploadFile = (files, fileAllows = ["png", "jpg"]) => {
  return new Promise((resolve, reject) => {
    const { file } = files;

    const isExtension = file.name.split(".");
    const fileType = isExtension[isExtension.length - 1];

    if (!fileAllows.includes(fileType)) {
      return reject(
        `La extencion ${fileType} no es permitida archivos permitidos: ${fileAllows}`
      );
    }

    const nameTemp = uuidv4() + "." + fileType;

    let sampleFile = files.file;

    const uploadPath = path.join(__dirname, "../uploads/", nameTemp);

    sampleFile.mv(uploadPath, function (err) {
      if (err) {
        return reject(err);
      }
      resolve(nameTemp);
    });
  });
};

module.exports = {
  uploadFile,
};
