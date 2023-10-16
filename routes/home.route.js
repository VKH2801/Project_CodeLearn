const express = require("express");
const router = express.Router();

var homeController = require("../controller/homeController");

router.get("/", homeController.getHome);
router.post("/getProduct", homeController.getProduct);
router.post("/getBestSeller", homeController.getBestSeller);

module.exports = router;
