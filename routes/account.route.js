const express = require("express");
const { appendFile } = require("fs");
const router = express.Router();

var accountController = require("../controller/accountController");

router.post('/Update',accountController.UpdatePromo)
router.post('/Add',accountController.AddPromo)
router.post('/Promo',accountController.ChangeBlock)
router.post('/LoadPromo',accountController.LoadPromo)
router.post('/ChangePassword',accountController.ChangePasswod)
router.post('/OpenBlock',accountController.OpenBlock)
router.post('/BlockUser',accountController.BlockUser)
router.post('/LoadData',accountController.LoadData)
router.use('/',accountController.RenderAccount)


module.exports = router


