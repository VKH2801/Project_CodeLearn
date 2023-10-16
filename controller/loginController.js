const express = require("express");
const { GetData } = require("../models/database");
var app = express();
var sql = require("../models/database");
var jwt = require("jsonwebtoken");

app.use(express.urlencoded({ extended: true }));

/* <-------> Load File Login <-------> */
async function RenderLogin(req, res) {
    res.render("Login");
}
async function Login(req, res) {
    var Query_TestTK = `Select * From TaiKhoan Where TenTK = '${req.body.UserName}' and MatKhau = '${req.body.Password}' and Tinhtrang = 'True'`;
    var TK_Existant = await GetData(Query_TestTK);
    if (TK_Existant.length <= 0) {
        res.send("Login Fail");
    } else {
        if (TK_Existant[0].LoaiTK == "admin     ") {
            var token = jwt.sign(
                {
                    id: TK_Existant[0].MaTK,
                },
                "mk"
            );
            var data = {
                token: token,
                User: TK_Existant[0].TenTK,
                LoaiTK: TK_Existant[0].LoaiTK,
            };
            res.send(data);
        } else {
            let str = `Select * From TaiKhoan JOIN KhachHang ON KhachHang.CMND = TaiKhoan.CMND Where TenTK = '${req.body.UserName}' and MatKhau = '${req.body.Password}' and Tinhtrang = 'True'`;
            var dt = await GetData(str);
            var token = jwt.sign(
                {
                    id: dt[0].MaTK,
                },
                "mk"
            );
            var data = {
                token: token,
                User: dt[0].TenTK,
                Capbac: dt[0].Capbac,
            };
            res.send(data);
        }
    }
}
/* <--------> Sign Up <---------> */
async function SignUp(req, res) {
    var Query_TestTK = `SELECT * FROM TaiKhoan WHERE TenTK = '${req.body.UserName}'`;
    var TK_Existant = await GetData(Query_TestTK);
    if (TK_Existant.length <= 0) {
        Query_Test_CMND = `SELECT CMND FROM TaiKhoan WHERE CMND = ${parseInt(req.body.Identity_Card)}`;
        Test_CMND = await sql.GetData(Query_Test_CMND);
        if (Test_CMND.length <= 0) {
            Insert_KH = `INSERT INTO KhachHang(CMND,Capbac) VALUES (${parseInt(req.body.Identity_Card)}, 'Silver')`;
            Insert_TK = `INSERT INTO TaiKhoan(TenTK,MatKhau,LoaiTK,CMND,Tinhtrang) VALUES ('${req.body.UserName}','${req.body.Password}','Customer',${parseInt(req.body.Identity_Card)}, 'True')`;
            a = await sql.GetData(Insert_KH);
            b = await sql.GetData(Insert_TK);
            res.send("Sign Up Success");
        } else {
            res.send("Duplicate identity card with other people !!");
        }
    } else {
        res.send("Already have an account !!");
    }
}

module.exports = {
    RenderLogin: RenderLogin,
    Login: Login,
    SignUp: SignUp,
};
