const express = require("express");
var app = express();
var path = require("path");
const { resolve } = require("path");
const { rejects } = require("assert");
var sql = require("../models/database");
const { GetData } = require("../models/database");
var fs = require("fs");

app.use(express.urlencoded({ extended: true }));

function getHome(req, res) {
    res.render("home");
}

async function getProduct(req, res) {
    var str = `SELECT TOP 8 * FROM SanPham WHERE Tinhtrang = 'True' ORDER BY NgayTSP DESC `;
    var data = await sql.GetData(str);
    res.send(data);
}
async function getBestSeller(req, res) {
    var str = `select TOP 6 SanPham.MaSP, HinhSP, GiaSP, Tinhtrang, SanPham.TenSP, SUM(ThanhTien) AS 'ThanhTien' from SanPham JOIN CTHD ON CTHD.MaSP = SanPham.MaSP
    where Tinhtrang = 'True' 
    GROUP BY SanPham.MaSP, SanPham.TenSP, HinhSP, GiaSP, Tinhtrang
    ORDER BY ThanhTien DESC`;
    var data = await sql.GetData(str);
    res.send(data);
}

module.exports = {
    getHome: getHome,
    getProduct: getProduct,
    getBestSeller: getBestSeller,
};
