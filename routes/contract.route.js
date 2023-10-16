const express = require("express");
const { appendFile } = require("fs");
const router = express.Router();

var contractController = require("../controller/contractController");

router.post("/SendMail", contractController.SendMail);
router.get("/", contractController.RenderContract);

module.exports = router;
