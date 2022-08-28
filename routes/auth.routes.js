const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { login } = require("../controller/logincontroller");
const { validationfields } = require("../middleware/user.middleware");



router.post("/login", [
    check("email", "Correo no valido").isEmail(),
    check("password", "Contrasela debe de ser obligatoria").not().isEmpty(),
    validationfields
], login)




module.exports = router;


