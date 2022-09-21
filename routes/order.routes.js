const { Router } = require("express");
const { check } = require("express-validator");
const { OrderProduct, getOrders } = require("../controller/Ordercontroller");
const { validateJWT } = require("../middleware/validateJWT");

const router = Router();

router.get("/getOrders", getOrders);

router.post(
  "/successOrder",
  [
    validateJWT,
    check("productId", "No a especificado ni un producto").isMongoId(),
    check("quantity", "La catidad debe ser almenos una pieza").isLength({
      min: 1,
    }),
  ],
  OrderProduct
);

module.exports = router;
