const { Router } = require("express");

const { check } = require("express-validator");
const {  finishOrder } = require("../controller/salecontroller");

const { validateJWT } = require("../middleware/validateJWT");
const { validationfields } = require("../middleware/user.middleware");
const { validateROL } = require("../middleware/validate_rols");
const { existOrder, orderIdfinish } = require("../helpers/db_validators");

const router = Router();

router.post("/postsale/:orderid",
  [
      validateJWT,
      validateROL,
      check("orderid", "El id no es valido").isMongoId(),
      check("orderid").custom(existOrder),
      check("orderid").custom(orderIdfinish),
    validationfields
  ],
  finishOrder
);

module.exports = router;
