const express = require("express");
const router = express.Router();

var shopController = require("../controller/shopController");

router.post("/DetailSP", shopController.DetailSP);
router.post("/Data", shopController.LoadData);
router.post("/search", shopController.seachItem);
router.get("/", shopController.RenderShop);

module.exports = router;
