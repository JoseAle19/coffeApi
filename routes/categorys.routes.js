const { Router } = require("express");
const { check } = require("express-validator");
const { createCategory, getCategorys, getCategory, updateCategory, deleteCategory } = require("../controller/category_controller");
const { categoryExistById } = require("../helpers/db_validators");
const router = Router();
// const { login, googleSingIn } = require("../controller/logincontroller");
const { validationfields } = require("../middleware/user.middleware");
const { validateJWT } = require("../middleware/validateJWT");
const { hasARole } = require("../middleware/validate_rols");


router.get("/getcategorys",getCategorys)


router.get("/getcategorybyid/:id",[
    check(`id`, `El id no es valido`).isMongoId(),
    check("id").custom(categoryExistById),
    validationfields
],getCategory)

router.post("/", [validateJWT, check("name", "El nombre es requerido").not().isEmpty(), validationfields], createCategory)

router.put("/updatecategory/:id", [
    validateJWT,
    hasARole("admin", "Order"),
    check("id","El id no es valido").isMongoId(),
    check("id").custom(categoryExistById),
    check("name", "El nombre es requerido").not().isEmpty(),
    
    validationfields
], updateCategory)

router.delete("/deletecategory/:id",[
    validateJWT,
    hasARole("admin", "Order"),
    check("id","El id no es valido").isMongoId(),
    check("id").custom(categoryExistById),
    validationfields
    
], deleteCategory)

module.exports = router;


