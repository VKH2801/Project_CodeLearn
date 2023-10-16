const express = require("express");
var app = express();
var sql = require("../models/database");
var bodyParser = require("body-parser");
const { GetData } = require("../models/database");

app.use(express.urlencoded({ extended: true }));

async function RenderCustomer(req,res){
    res.render('Customer')
}
async function LoadData(req,res){
    Query_Customer = `Select * From KhachHang`
    res.send(await GetData(Query_Customer))
}
async function FindCustomer(req,res){
    if(req.body.Value == "Card"){
        if(req.body.Text == ''){
            res.send(await GetData('Select * From KhachHang'))
        }
        res.send(await GetData(`Select * From KhachHang Where CMND Like '%${parseInt(req.body.Text)}%'`))
    }
    else{
            res.send(await GetData(`Select * From KhachHang Where TenKH Like '%${req.body.Text}%'`))
    }
}
async function DetailProfile(req,res){
   Query_Detail = `Select 
   TaiKhoan.TenTK,TaiKhoan.MatKhau,KhachHang.TenKH,KhachHang.NgSinh,KhachHang.Gioitinh,KhachHang.Diachi,KhachHang.Capbac
   From KhachHang
   join TaiKhoan on TaiKhoan.CMND = KhachHang.CMND
   Where KhachHang.CMND = ${parseInt(req.body.CMND)}`
   res.send(await GetData(Query_Detail))
}
module.exports = {
    RenderCustomer : RenderCustomer,
    FindCustomer:FindCustomer,
    DetailProfile : DetailProfile,
    LoadData : LoadData,
}