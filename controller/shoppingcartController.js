const express = require("express");
var app = express();
const { resolve } = require("path");
const { rejects } = require("assert");
var sql = require("../models/database");
const { GetData } = require("../models/database");
app.use(express.urlencoded({ extended: true }));

async function getShoppingCart(req, res) {
    res.render("shoppingcart");
}

async function getListCart(req, res) {
    if (req.body.stored == "()") {
        var result = "[]";
        res.send(result);
    } else {
        var str = `select * from SanPham where MaSP in ${req.body.stored}`;
        var result = await GetData(str);
        res.send(result);
    }
}

async function checkCoupon(req, res) {
    var str = `SELECT * FROM KhuyenMai WHERE MaKM = '${req.body.MaKM}' AND MaKM LIKE '%${req.body.Capbac}%' AND TrangThai = 'True'`;
    var data = await GetData(str);
    res.send(data);
}

async function loadInfoCheckOut(req, res) {
    var str = `SELECT KhachHang.CMND, TaiKhoan.TenTK, KhachHang.TenKH, KhachHang.Capbac, KhachHang.Sdt, KhachHang.Diachi
    FROM KhachHang JOIN TaiKhoan ON TaiKhoan.CMND = KhachHang.CMND
    WHERE TaiKhoan.TenTK = '${req.body.tenTK}'`;
    var data = await GetData(str);
    res.send(data);
}

async function checkOut(req, res) {
    console.log(req.body);
    let maKhuyenMai = req.body.MaKM;
    if (maKhuyenMai != "null") {
        maKhuyenMai = `'${req.body.MaKM}'`;
    }
    var str1 = `INSERT INTO HoaDon (CMND, MaKM, DiaChiGH, TongTien, NgayDat) VALUES ('${req.body.CMND}', ${maKhuyenMai}, N'${req.body.DiaChiGH}', ${parseInt(req.body.TongTien)} ,'${req.body.NgayDat}')`;
    await sql.GetData(str1);

    var str2 = `SELECT @@IDENTITY AS 'MaHD'`;
    var maHD = await sql.GetData(str2);

    var list = req.body.dsSP;
    for (let i = 0; i < list.length; i++) {
        var str3 = `INSERT INTO CTHD (MaHD, MaSP, SL, ThanhTien)
        VALUES (${parseInt(maHD[0].MaHD)}, ${parseInt(list[i].idSP)}, ${parseInt(list[i].quantity)}, ${parseInt(list[i].tongTienTungSP)})`;
        await sql.GetData(str3);

        var strSetQuantity = `UPDATE SanPham SET SL =  SL - (SELECT SL FROM CTHD WHERE MaHD = ${parseInt(maHD[0].MaHD)} AND MaSP = ${parseInt(list[i].idSP)}) WHERE MaSP = ${parseInt(list[i].idSP)}`;
        await sql.GetData(strSetQuantity);

        var strSLT = `SELECT SL FROM SanPham WHERE MaSP = ${parseInt(list[i].idSP)}`;
        let soLuongTon = await sql.GetData(strSLT);
        if (parseInt(soLuongTon[0].SL) <= 0) {
            await sql.GetData(`UPDATE SanPham SET Tinhtrang = 0 WHERE MaSP = ${list[i].idSP}`);
        }
    }

    var strSoHD = `SELECT COUNT(MaHD) AS SoHD FROM HoaDon WHERE CMND = ${req.body.CMND}`;
    var soHoaDon = await sql.GetData(strSoHD);
    if (soHoaDon[0].SoHD == 2) {
        await sql.GetData(`UPDATE KhachHang SET Capbac = 'GOLD' WHERE CMND = ${req.body.CMND}`);
    } else if (soHoaDon[0].SoHD == 14) {
        await sql.GetData(`UPDATE KhachHang SET Capbac = 'PLATINUM' WHERE CMND = ${req.body.CMND}`);
    }
    res.send("Checkout Success!");
}

module.exports = {
    getShoppingCart: getShoppingCart,
    getListCart: getListCart,
    checkCoupon: checkCoupon,
    loadInfoCheckOut: loadInfoCheckOut,
    checkOut: checkOut,
};
