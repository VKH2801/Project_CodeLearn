const express = require("express");
var app = express();
const { resolve } = require("path");
const { rejects } = require("assert");
var sql = require("../models/database");
const { GetData } = require("../models/database");

app.use(express.urlencoded({ extended: true }));

async function getUser(req, res) {
    res.render("user");
}

async function getInfoUser(req, res) {
    var str = `SELECT TaiKhoan.MaTK, TaiKhoan.TenTK, TaiKhoan.CMND, TenKH, NgSinh, Gioitinh, Diachi, Capbac, Avatar, Sdt
    FROM TaiKhoan JOIN KhachHang ON TaiKhoan.CMND = KhachHang.CMND WHERE TaiKhoan.TenTK = '${req.body.tenTK}'`;
    var data = await sql.GetData(str);
    res.send(data);
}

async function updateInfoUser(req, res) {
    var str = `UPDATE KhachHang SET TenKH = N'${req.body.tenKH}', NgSinh = '${req.body.ngaySinh}',
    Gioitinh = '${req.body.gioiTinh}', Diachi = N'${req.body.diaChi}', Sdt = '${req.body.soDT}'
    WHERE CMND = ${parseInt(req.body.CMND)}`;
    await sql.GetData(str);
    res.send("Update success");
}

async function changePassword(req, res) {
    var str = `SELECT * FROM TaiKhoan WHERE TenTK = '${req.body.tenTK}'`;
    var mkCu = await sql.GetData(str);
    if (mkCu[0].MatKhau == req.body.passWord) {
        var str2 = `UPDATE TaiKhoan SET MatKhau = '${req.body.newPass}' WHERE TenTK = '${req.body.tenTK}'`;
        await sql.GetData(str2);
        res.send("success");
    } else {
        res.send("fail");
    }
}

async function updateImage(req, res) {
    const file = req.file;
    if (!file) {
        res.redirect("/user");
    } else {
        var str = `UPDATE KhachHang SET Avatar = '${req.file.filename}' WHERE CMND = ${parseInt(req.body.idUser)}`;
        await sql.GetData(str);
        res.redirect("/user");
    }
}

async function getBills(req, res) {
    var str = `SELECT TaiKhoan.TenTK, HoaDon.MaHD, HoaDon.NgayDat, COUNT(CTHD.MaHD) AS 'SoSanPham', HoaDon.TongTien
    FROM HoaDon JOIN KhachHang ON KhachHang.CMND = HoaDon.CMND
    JOIN TaiKhoan ON TaiKhoan.CMND = KhachHang.CMND
    JOIN CTHD ON HoaDon.MaHD = CTHD.MaHD 
    WHERE TaiKhoan.TenTK = '${req.body.tenTK}'
    GROUP BY HoaDon.MaHD, HoaDon.NgayDat, HoaDon.TongTien, TaiKhoan.TenTK`;
    var result = await sql.GetData(str);
    res.send(result);
}

async function getDetailBills(req, res) {
    var str = `SELECT HoaDon.MaHD, HoaDon.NgayDat, HoaDon.TongTien, SanPham.TenSP, SanPham.HinhSP, CTHD.ThanhTien, CTHD.SL, HoaDon.MaKM
    FROM HoaDon JOIN CTHD ON CTHD.MaHD = HoaDon.MaHD
    JOIN SanPham ON SanPham.MaSP = CTHD.MaSP
    WHERE HoaDon.MaHD = ${parseInt(req.body.MaHD)}`;
    var result = await sql.GetData(str);
    res.send(result);
}

module.exports = {
    getUser: getUser,
    getInfoUser: getInfoUser,
    changePassword: changePassword,
    updateInfoUser: updateInfoUser,
    updateImage: updateImage,
    getBills: getBills,
    getDetailBills: getDetailBills,
};
