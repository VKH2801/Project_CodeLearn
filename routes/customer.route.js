const express = require("express");
const { appendFile } = require("fs");
const router = express.Router();

var customerController = require("../controller/customerController");

router.post('/FindCustomer',customerController.FindCustomer)
router.post('/DetailProfile',customerController.DetailProfile)
router.post('/LoadData',customerController.LoadData)
router.use('/',customerController.RenderCustomer)

module.exports = router

