const express = require("express");
var app = express();
var sql = require("../models/database");
var bodyParser = require("body-parser");
const { GetData } = require("../models/database");
const { renameSync } = require("fs");
const { ADDRCONFIG } = require("dns");

app.use(express.urlencoded({ extended: true }));

async function RenderAccount(req, res) {
    res.render("Account");
}
async function LoadData(req, res) {
    Query_Account = `Select * From TaiKhoan`;
    res.send(await GetData(Query_Account));
}
async function BlockUser(req, res) {
    if (req.body.Role == "admin     ") {
        res.send("You can block Admin !!!");
    } else {
        Query_Account = `Update TaiKhoan Set Tinhtrang = 0 where MaTK = ${parseInt(req.body.UserTK)}`;
        await GetData(Query_Account);
        res.send("Successfull !!");
    }
}
async function OpenBlock(req, res) {
    if (req.body.Role == "admin     ") {
        res.send("You can block Admin !!!");
    } else {
        Query_Account = `Update TaiKhoan Set Tinhtrang = 1 where MaTK = ${parseInt(req.body.UserTK)}`;
        await GetData(Query_Account);
        res.send("Successfull !!");
    }
}
async function ChangePasswod(req, res) {
    console.log(req.body);
    Query_Change = `Update TaiKhoan Set MatKhau = '${req.body.New}'`;
    Query_CheckPassWord = `Select * From TaiKhoan Where MaTK = ${req.body.MaTK} and MatKhau = '${req.body.Old}'`;
    var Check = await GetData(Query_CheckPassWord);
    if (Check.length <= 0) {
        res.send("Old Password is incorrect !!");
    } else {
        if (req.body.New == req.body.Repeat) {
            await GetData(`Update TaiKhoan Set MatKhau = '${req.body.New}' Where MaTK = ${parseInt(req.body.MaTK)}`);
            res.send("Successfull !!");
        } else {
            res.send("New password does not match !!");
        }
    }
}
async function LoadPromo(req, res) {
    Query_Promo = `Select * From KhuyenMai`;
    var Promo = await GetData(Query_Promo);
    res.send(Promo);
}
async function ChangeBlock(req, res) {
    Query_ChangePromo = `Update KhuyenMai Set TrangThai = '${req.body.TT}' where MaKM = '${req.body.Id}'`;
    await GetData(Query_ChangePromo);
    res.send("Successfuly !!");
}
async function AddPromo(req, res) {
    Query_Check = `Select MaKM From KhuyenMai where MaKM = '${req.body.Id}'`;
    var Check = await GetData(Query_Check);
    if (Check.length <= 0) {
        Query_AddPromo = `INSERT INTO KhuyenMai(MaKM,NoiDung,GiaTri,TrangThai) VALUES ('${req.body.Id}','${req.body.Content}',${parseInt(req.body.Value)},1)`;
        await GetData(Query_AddPromo);
        res.send("Successfully !!");
    } else {
        res.send("Error");
    }
}
async function UpdatePromo(req, res) {
    console.log(req.body);
    Query_Update = `Update KhuyenMai Set NoiDung = '${req.body.Content}' , GiaTri = ${parseInt(req.body.Value)} Where MaKM = '${req.body.Id}'`;
    res.send(await GetData(Query_Update));
}
module.exports = {
    RenderAccount: RenderAccount,
    LoadData: LoadData,
    BlockUser: BlockUser,
    OpenBlock: OpenBlock,
    ChangePasswod: ChangePasswod,
    LoadPromo: LoadPromo,
    ChangeBlock: ChangeBlock,
    AddPromo: AddPromo,
    UpdatePromo: UpdatePromo,
};
