const express = require("express");
const router = express.Router();

var loginController = require("../controller/loginController");

router.post("/Authentic", loginController.Login);
router.post("/SignUp", loginController.SignUp);
router.get("/", loginController.RenderLogin);

module.exports = router;
