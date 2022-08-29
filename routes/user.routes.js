const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const { validatorRol, existEmail, userExistById } = require("../helpers/db_validators");
const { userget, userput, userpost, userdelete } = require("../controller/user.controller");
const { validationfields } = require("../middleware/user.middleware");
const { validateJWT } = require("../middleware/validateJWT");
const { validateROL, hasARole } = require("../middleware/validate_rols");


router.get("/getuser", userget);

router.put("/putuser/:userid", [
    check(`userid`, `Este no es un id valido`).isMongoId(),
    check(`userid`).custom(userExistById),
    validationfields,
], userput);

router.post("/postuser", [
    check("name", "Nombre no debe estar vacio").not().isEmpty(),
    check("email", "Correo no es valido").isEmail(),
    check("password", "Password debe de ser mas de 6 letras").isLength({ min: 6 }),
    check("rol").custom(validatorRol),
    check("email").custom(existEmail),
    validationfields
], userpost);

router.delete("/deleteuser/:userid", [
    validateJWT,
    hasARole("admin", "sale",),
    // validateROL,
    check(`userid`, `Este no es un id valido`).isMongoId(),
    check(`userid`).custom(userExistById),
    validationfields
], userdelete);


module.exports = router;