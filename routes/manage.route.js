const express = require("express");
const { appendFile } = require("fs");
const router = express.Router();

var manageController = require("../controller/manageController");

router.post("/Additem", manageController.Additem);
router.post("/UpdateItem", manageController.UpdateItem)
router.post("/DispperStatus", manageController.DispperSP);
router.post("/ApperStatus", manageController.ApperSP);
router.post("/FindProducts", manageController.FindProducts);
router.post("/Load", manageController.LoadData);
router.use("/", manageController.renderManage);

module.exports = router;
