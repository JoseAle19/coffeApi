const { Router } = require("express");
const { validateJWT } = require("../middleware/validateJWT");

const { validationfields } = require("../middleware/user.middleware");
const { categoryExistById, existProduct } = require("../helpers/db_validators");

const { uploadFile } = require("../helpers");
const { check } = require("express-validator");
const router = Router();
const {
  createProduct,
  getProducts,
  getProductsById,
  updateProduct,
  deleteProduct,
  deleteQuantityProduct,
} = require("../controller/product_controller");
const { isFile } = require("../middleware");

router.get("/getProducts", getProducts);

router.get(
  "/getproductsById/:id",
  [
    check("id", "Este no es un id de valido").isMongoId(),
    check("id").custom(existProduct),
    validationfields,
  ],
  getProductsById
);

router.post(
  "/createProduct",
  [
    isFile,
    validateJWT,
    check("name", "El nombre del producto es requerido").not().isEmpty(),
    check("price", "El precio no puede quedar vacio").not().isEmpty(),
    check("category", "Elige una categoria para el producto").not().isEmpty(),
    check("stock", "La cantidad debe ser mayor a 1").isLength({
      min: 1,
    }),
    check("category", "Este no es un id  valido").isMongoId(),
    check("description", "Breve descripcion del producto").not().isEmpty(),
    validationfields,
  ],
  createProduct
);
router.put(
  "/updateProduct/:id",
  [
    isFile, //* valida si viene el archivo(la imagen del producto)
    validateJWT,
    check(`id`, `El id no es valido`).isMongoId(),
    check(`id`).custom(existProduct),
    validationfields,
  ],
  updateProduct
);

// router.delete("/deleteProduct ", deleteProduct)
router.delete(
  "/deleteProduct/:id",
  [
    validateJWT,
    check("id", "El id del producto no es valido").isMongoId(),
    check("id").custom(existProduct),
    validationfields,
  ],
  deleteProduct
);

router.post(`/OrderProduct/:productid`, deleteQuantityProduct);

router.post("/uploadImage", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ msg: "No hay archivos en los files" });
  }

  try {
    const fileUpload = await uploadFile(req.files);
    return res.json({ fileUpload });
  } catch (error) {
    res.json({ msg: error });
  }
});
module.exports = router;
