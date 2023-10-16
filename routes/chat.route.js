const express = require("express");
const { appendFile } = require("fs");
const router = express.Router();

var chatController = require("../controller/chatController");

router.use('/',chatController.RenderChat)

module.exports = router