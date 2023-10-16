var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");
var sql = require("mssql/msnodesqlv8");
var cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const Authentic = require("./Middleware/Authentic");
var homeRouter = require("./routes/home.route");
var shoppingcartRouter = require("./routes/shoppingcart.route");
var userRouter = require("./routes/user.route");
var ContractRouter = require("./routes/contract.route");
var LoginRouter = require("./routes/login.route");
var ShopRouter = require("./routes/shop.route");
var ManageRouter = require("./routes/manage.route");
var aboutRouter = require("./routes/about.route");
var CustomerRouter = require("./routes/customer.route");
var AccountRouter = require("./routes/account.route");
var ChatRouter = require("./routes/chat.route");
var SumarryRouter = require("./routes/sumary.route");

app.use("/Contract", ContractRouter);
app.use("/Login", LoginRouter);
app.use("/Shopping", ShopRouter);
app.use("/Manage", Authentic.CheckLogin, Authentic.CheckRole, ManageRouter);
app.use("/home", homeRouter);
app.use("/shoppingcart", shoppingcartRouter);
app.use("/user", userRouter);
app.use("/about", aboutRouter);
app.use("/Customer", Authentic.CheckLogin, Authentic.CheckRole, CustomerRouter);
app.use("/Account", Authentic.CheckLogin, Authentic.CheckRole, AccountRouter);
app.use("/Chat", Authentic.CheckLogin, Authentic.CheckRole, ChatRouter);
app.use("/Sumarry", Authentic.CheckLogin, Authentic.CheckRole, SumarryRouter);

var io = require("socket.io")(
    (sever = app.listen(3000, () => {
        console.log("sever is running");
    }))
);

var arr = [];

io.on("connection", (socket) => {
    socket.on("User", (name) => {
        socket.id = name;

        if (arr.indexOf(socket.id) < 0) {
            arr.push(socket.id);
        }

        socket.broadcast.emit("Send-DS", arr);
    });

    socket.on("disconnected", function (user) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == user) {
                arr.splice(i, 1);
            }
        }

        socket.broadcast.emit("Send-DS", arr);
    });

    socket.on("Send-Messenger", (data) => {
        socket.broadcast.emit("Send-Client", { tk: socket.id, nd: data });
    });
});
