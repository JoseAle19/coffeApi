const { Router } = require("express");
const { check } = require("express-validator");
const { updateImage, getImages, updateImageCloudinary } = require("../controller/uploadimage");
const { validateCollections } = require("../helpers");
const { isFile, validationfields } = require("../middleware/");
const router = Router();

router.put(
  "/updateimage/:collections/:id",
  [
    isFile,
    check("id", "Este no es un id valido").isMongoId(),
    check("collections").custom(validateCollections),
    validationfields,
  ],
  updateImageCloudinary
  );
  
  // updateImage
router.get("/getimages/:collections/:id", [
  check("id", "Este no es un id valido").isMongoId(),
  check("collections").custom(validateCollections),
  validationfields,
],
getImages
);

module.exports = router;
