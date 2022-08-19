const { Router } = require("express");
const { userget, userput, userpost, userdelete } = require("../controller/user.controller");

const router = Router();


router.get("/hola", userget );

router.put("/hola", userput );

router.post("/hola",userpost);

router.delete("/hola",userdelete);


module.exports = router;