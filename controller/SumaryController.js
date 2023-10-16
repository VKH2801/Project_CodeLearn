const express = require("express");
var app = express();
var sql = require("../models/database");
var bodyParser = require("body-parser");
const { GetData } = require("../models/database");

async function renderSumary(req, res) {
  a = `select sum(HoaDon.TongTien) AS TT from HoaDon`;
  b = `SELECT COUNT(KhachHang.CMND) AS KH FROM KhachHang`;
  c = `SELECT COUNT(SanPham.MaSP) AS SP From SanPham`;
  Query_Money = await sql.GetData(a);
  Query_Customer = await sql.GetData(b);
  Query_Product = await GetData(c);
  res.render("Sumary", {
    Money: Query_Money,
    Customer: Query_Customer,
    Product: Query_Product,
  });
}
// Load Dữ liệu .............................
async function LoadData(req, res) {
  Query_Bill = `Select * From HoaDon`;
  var Bill = await GetData(Query_Bill);
  res.send(Bill);
}
// Chi tiết hóa đơn .......................
async function DetailBill(req, res) {
  Query_Detail = `Select KhachHang.TenKH , SanPham.TenSP, HoaDon.DiaChiGH , CTHD.SL from HoaDon
    join KhachHang on KhachHang.CMND = HoaDon.CMND
    join CTHD on CTHD.MaHD = HoaDon.MaHD
    join SanPham on SanPham.MaSP = CTHD.MaSP
    where HoaDon.MaHD = ${parseInt(req.body.Id)}`;
  var Detail = await GetData(Query_Detail);
  res.send(Detail);
}
// Load lên biểu đồ ...................
async function RevenueYear(req, res) {
  var Year = req.body.Nam
  var ArrayYear = [];
  for (i in Year) {
    Query_RevenueYear = `select SUM(HoaDon.TongTien) AS TongTien FROM HoaDon WHERE YEAR(HoaDon.NgayDat) = ${parseInt((req.body.Nam)[i])}`
    RevenueYear = await GetData(Query_RevenueYear)
    ArrayYear.push(RevenueYear[0].TongTien)
}
  res.send(ArrayYear)
}
// Load tổng tiền của hóa đơn.................
async function Revenue(req, res) {
  Query_Revenue = `select SUM(HoaDon.TongTien) AS TongTien FROM HoaDon where MONTH(NgayDat) = ${parseInt(
    req.body.Month
  )}`;
  var Revenue = await GetData(Query_Revenue);
  res.send(Revenue);
}
// Load Tổng tiền những sản phẩm ...............
async function ProductBill(req, res) {
  Query_Product = `select SanPham.TenSP , SanPham.XuatSu , SUM(CTHD.SL) AS SL , SUM(CTHD.ThanhTien) AS TT FROM SanPham
    join CTHD on CTHD.MaSP = SanPham.MaSP
    GROUP BY  SanPham.TenSP , SanPham.XuatSu`;
  res.send(await GetData(Query_Product));
}
module.exports = {
  renderSumary: renderSumary,
  LoadData: LoadData,
  DetailBill: DetailBill,
  Revenue: Revenue,
  RevenueYear: RevenueYear,
  ProductBill: ProductBill,
};
