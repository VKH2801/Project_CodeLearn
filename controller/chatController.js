const express = require("express");
var app = express();
var sql = require("../models/database");
var bodyParser = require("body-parser");
const { GetData } = require("../models/database");


async function RenderChat(req,res){
    res.render('Chat')
}

module.exports = {
    RenderChat : RenderChat
}