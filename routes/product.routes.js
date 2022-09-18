const { Router } = require("express");
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
const { validateJWT } = require("../middleware/validateJWT");

const { validationfields } = require("../middleware/user.middleware");
const { categoryExistById, existProduct } = require("../helpers/db_validators");

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
    validateJWT,
    check("name", "El nombre del producto es requerido").not().isEmpty(),
    check("price", "El precio no puede quedar vacio").not().isEmpty(),
    check("category", "Elige una categoria para el producto").not().isEmpty(),
    check("stock", "La cantidad debe ser mayor a 1").isLength({
      min: 1
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


router.post(`/OrderProduct/:productid`, deleteQuantityProduct)

module.exports = router;
