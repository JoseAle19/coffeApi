const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { login, googleSingIn } = require("../controller/logincontroller");
const { validationfields } = require("../middleware/user.middleware");



router.post("/login", [
    check("email", "Correo no valido").isEmail(),
    check("password", "Contrasela debe de ser obligatoria").not().isEmpty(),
    validationfields
], login)



router.post("/google", [
    check("id_token", "Token es obligatoria").not().isEmpty(),
    validationfields
], googleSingIn)




module.exports = router;


