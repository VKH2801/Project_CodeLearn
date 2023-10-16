const express = require("express");
var app = express();
var nodemailer = require("nodemailer");
app.use(express.urlencoded({ extended: true }));

/* <-------> Load File Contract <-------> */
async function RenderContract(req, res) {
    res.render("Contract");
}

/* <------> Gửi Mail <---------> */
async function SendMail(req, res) {
    var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "tn717376@gmail.com",
            pass: "danctrkgerhpiyxb",
        },
    });
    var mainOptions = {
        from: req.body.Email,
        to: "tn717376@gmail.com",
        subject: req.body.subject,
        text: req.body.substanc,
        html: "<p>I Have A FeedBack For You</b><ul><li>Username:" + req.body.Name + "</li><li>Email:" + req.body.Email + "</li><ul><li>dentity-card:" + req.body.Card + "</li><li>Feedback:" + req.body.substanc + "</li></ul>",
    };
    transporter.sendMail(mainOptions, function (err, infor) {
        res.send("Nhận Mail Thành Công");
    });
}
module.exports = {
    RenderContract: RenderContract,
    SendMail: SendMail,
};
