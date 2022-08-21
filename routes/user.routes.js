const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const { validatorRol, existEmail, userExistById } = require("../helpers/db_validators");
const { userget, userput, userpost, userdelete } = require("../controller/user.controller");
const { validationUser } = require("../middleware/user.middleware");


router.get("/getuser", userget);

router.put("/putuser/:userid", [
    check(`userid`, `Este no es un id valido`).isMongoId(),
    check(`userid`).custom(userExistById),
    validationUser,
], userput);

router.post("/postuser", [
    check("name", "Nombre no debe estar vacio").not().isEmpty(),
    check("email", "Correo no es valido").isEmail(),
    check("password", "Password debe de ser mas de 6 letras").isLength({ min: 6 }),
    check("rol").custom(validatorRol),
    check("email").custom(existEmail),
    validationUser
], userpost);

router.delete("/deleteuser/:userid", [
    check(`userid`, `Este no es un id valido`).isMongoId(),
    check(`userid`).custom(userExistById),
    validationUser
], userdelete);


module.exports = router;