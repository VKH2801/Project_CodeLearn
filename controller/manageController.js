const express = require("express");
var app = express();
var sql = require("../models/database");
var bodyParser = require("body-parser");
const { GetData } = require("../models/database");

app.use(express.urlencoded({ extended: true }));


async function renderManage(req, res) {
  res.render("Manage");
}
// Load Data lên trang................
async function LoadData(req, res) {
  Query_Data = `Select * From SanPham`;
  var data = await GetData(Query_Data);
  res.send(data);
}
// Tìm kiếm sản phẩm...............
async function FindProducts(req, res) {
  if (req.body.NameSP == "") {
    Query_Product = `SELECT * FROM SanPham WHERE TenSP LIKE '%%'`;
    var Data = await GetData(Query_Product);
    res.send(Data);
  } else {
    Query_Product = `SELECT * FROM SanPham WHERE TenSP LIKE '%${req.body.NameSP}%'`;
    var Data = await GetData(Query_Product);
    res.send(Data);
  }
}
// Thêm sản phẩm
async function Additem(req, res) {
    Query_Additem = `INSERT INTO SanPham(TenSP,GiaSP,XuatSu,GioiTinh,SL,Tinhtrang,HinhSP,NgayTSP) VALUES
    ('${req.body.NameSP}',${parseInt(req.body.PriceSP)},'${req.body.OriginSP}',${parseInt(req.body.SexSP)},${parseInt(req.body.AmountSP)},'1','${req.body.ImageSP}',(Select CONVERT(date, GETDATE(), 103)))`
    await GetData(Query_Additem)
    res.send('Successfuly !!')
}
// Ẩn sản phẩm.................
async function DispperSP(req,res){
  if(req.body.Tinhtrang){
    Query_UpdateItem = `UPDATE SanPham SET Tinhtrang = '0' WHERE MaSP = ${parseInt(req.body.MaSP)};`
    await GetData(Query_UpdateItem)
    res.send('Successfuly !')
  }
}
// Hiện sản phẩm.................
async function ApperSP(req,res){
  if(req.body.Tinhtrang){
    Query_UpdateItem = `UPDATE SanPham SET Tinhtrang = '1' WHERE MaSP = ${parseInt(req.body.MaSP)};`
    await GetData(Query_UpdateItem)
    res.send('Successfuly !')
  }
}
// Cập nhật sản phẩm ......................
async function UpdateItem(req,res){
   Query_Update = `Update SanPham Set TenSP = '${req.body.NameSP}' , GiaSP = ${parseInt(req.body.PriceSP)} , XuatSu = '${req.body.OriginSP}', Gioitinh = ${parseInt(req.body.SexSP)}, SL = ${parseInt(req.body.AmountSP)} , HinhSP = '${req.body.ImageSP}' Where MaSP = ${parseInt(req.body.IdSP)}`
   await GetData(Query_Update)
   res.send('Successfuly !')
}
module.exports = {
  renderManage: renderManage,
  LoadData: LoadData,
  DispperSP : DispperSP,
  ApperSP : ApperSP,
  UpdateItem : UpdateItem,
  FindProducts: FindProducts,
  Additem : Additem
};
