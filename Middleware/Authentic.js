const jwt = require("jsonwebtoken");
const express = require("express");
var sql = require("../models/database");
var cookieParser = require("cookie-parser");
const { GetData } = require("../models/database");
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

var CheckLogin = async (req, res, next) => {
  var token = req.cookies.token;
  if (token) {
    var Authen = jwt.verify(token, "mk");
    Query_SetTK = `Select LoaiTK From TaiKhoan Where MaTK = '${Authen.id}'`;
    var SetTK = await GetData(Query_SetTK);
    if (SetTK.length >= 0) {
      req.data = SetTK[0].LoaiTK;
      next();
    }
  } else {
    res.redirect("/Login");
  }
};
var CheckRole = (req, res, next) => {
  if (req.data == "admin     ") {
    next();
  } else {
    res.redirect("/Home");
  }
};
module.exports = {
  CheckLogin: CheckLogin,
  CheckRole: CheckRole,
};
