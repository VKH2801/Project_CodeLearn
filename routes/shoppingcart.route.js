const express = require("express");
const router = express.Router();

var shoppingcartController = require("../controller/shoppingcartController");

router.get("/", shoppingcartController.getShoppingCart);
router.post("/loadCart", shoppingcartController.getListCart);
router.post("/checkCoupon", shoppingcartController.checkCoupon);
router.post("/checkOut", shoppingcartController.checkOut);
router.post("/loadInfoCheckOut", shoppingcartController.loadInfoCheckOut);

module.exports = router;
