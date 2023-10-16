const express = require("express");
const { QueryEvent } = require("msnodesqlv8");
const { GetData } = require("../models/database");
var app = express();
var sql = require("../models/database");
app.use(express.urlencoded({ extended: true }));

/* <----------> Load File Shop <------------> */
async function RenderShop(req, res) {
    var Query_SP = `Select * From SanPham Where Tinhtrang = 'True'`;
    var RenderSP = await sql.GetData(Query_SP);

    //Pagination
    var PAGE_SIZE = 8;
    var page = parseInt(req.query.page);
    var soPage = Math.ceil(RenderSP.length / PAGE_SIZE);
    if (!page) {
        page = 1;
    }
    var start = (page - 1) * PAGE_SIZE;
    var end = start + PAGE_SIZE;
    var DanhSachSP = RenderSP.slice(start, end);
    res.render("Shop", {
        SP: DanhSachSP,
        soPage: soPage,
        pagehientai: page,
    });
}
/* <----------> Detail Product <------------> */
async function DetailSP(req, res) {
    Query_Detail = `Select * From SanPham Where MaSP = ${req.body.idSP}`;
    res.send(await GetData(Query_Detail));
}
/*<----------> Event Pagination <------------> */
async function LoadData(req, res) {
    Query_LoadData = `Select * From SanPham`;
    res.send(await GetData(Query_LoadData));
}

async function seachItem(req, res) {
    if (req.body.catelogy == "") {
        Query_LoadData = `SELECT * FROM SanPham WHERE TenSP LIKE '%${req.body.itemName}%'`;
        var RenderSP = await GetData(Query_LoadData);
        var PAGE_SIZE = 8;
        var page = parseInt(req.query.page);
        var soPage = Math.ceil(RenderSP.length / PAGE_SIZE);
        if (!page) {
            page = 1;
        }
        var start = (page - 1) * PAGE_SIZE;
        var end = start + PAGE_SIZE;
        var DanhSachSP = RenderSP.slice(start, end);
        res.render("Shop", {
            SP: DanhSachSP,
            soPage: soPage,
            pagehientai: page,
        });
    } else if (req.body.catelogy == "id") {
        Query_LoadData = `SELECT * FROM SanPham WHERE MaSP = '${req.body.itemName}'`;
        var RenderSP = await GetData(Query_LoadData);
        var PAGE_SIZE = 8;
        var page = parseInt(req.query.page);
        var soPage = Math.ceil(RenderSP.length / PAGE_SIZE);
        if (!page) {
            page = 1;
        }
        var start = (page - 1) * PAGE_SIZE;
        var end = start + PAGE_SIZE;
        var DanhSachSP = RenderSP.slice(start, end);
        res.render("Shop", {
            SP: DanhSachSP,
            soPage: soPage,
            pagehientai: page,
        });
    } else if (req.body.catelogy == "name") {
        Query_LoadData = `SELECT * FROM SanPham WHERE TenSP LIKE '%${req.body.itemName}%'`;
        var RenderSP = await GetData(Query_LoadData);
        var PAGE_SIZE = 8;
        var page = parseInt(req.query.page);
        var soPage = Math.ceil(RenderSP.length / PAGE_SIZE);
        if (!page) {
            page = 1;
        }
        var start = (page - 1) * PAGE_SIZE;
        var end = start + PAGE_SIZE;
        var DanhSachSP = RenderSP.slice(start, end);
        res.render("Shop", {
            SP: DanhSachSP,
            soPage: soPage,
            pagehientai: page,
        });
    }
}

module.exports = {
    RenderShop: RenderShop,
    LoadData: LoadData,
    DetailSP: DetailSP,
    seachItem: seachItem,
};
