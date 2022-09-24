const { Router } = require("express");
const { check } = require("express-validator");
const { OrderProduct, getOrders } = require("../controller/Ordercontroller");
const { validateJWT } = require("../middleware/validateJWT");
const { validationfields } = require("../middleware/user.middleware");

const router = Router();

router.get("/getOrders", getOrders);

router.post(
  "/successOrder",
  [
    validateJWT,
    check("dataProducts", "No a especificado ni un producto").isLength({
      min: 1,
    }),
    validationfields,
  ],
  OrderProduct
);

module.exports = router;
