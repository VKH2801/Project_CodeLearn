const express = require("express");
const router = express.Router();

var aboutController = require("../controller/aboutController");

router.get("/", aboutController.getAbout);

module.exports = router;
