const { Router } = require("express");
const { check } = require("express-validator");
const { orderProduct, getOrders, deleteOrder } = require("../controller/Ordercontroller");
const { validateJWT } = require("../middleware/validateJWT");
const { validationfields } = require("../middleware/user.middleware");
const { validateROL } = require("../middleware");
const { existOrder } = require("../helpers");

const router = Router();

router.get("/getOrders", getOrders);

router.post(
  "/successOrder",
  [
    validateJWT,
    validateROL,
    check("dataProducts", "No a especificado ni un producto").isLength({
      min: 1,
    }),
    validationfields,
  ],
  orderProduct
);



router.delete('/deleteOrder/:orderid', [
  validateJWT,
  validateROL,
  check("orderid", "El id no es valido").isMongoId(),
  check("orderid").custom(existOrder),
validationfields
], deleteOrder)

module.exports = router;
