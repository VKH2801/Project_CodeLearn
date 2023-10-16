const express = require("express");
const { appendFile } = require("fs");
const router = express.Router();

var sumaryController = require("../controller/sumaryController");

router.post('/RevenueYear',sumaryController.RevenueYear)
router.post('/BillProduct',sumaryController.ProductBill)
router.post('/Month',sumaryController.Revenue)
router.post('/ViewDetail',sumaryController.DetailBill)
router.post('/LoadData',sumaryController.LoadData)
router.use('/',sumaryController.renderSumary)

module.exports = router