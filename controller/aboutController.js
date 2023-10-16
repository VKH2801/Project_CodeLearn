const express = require("express");
var app = express();
const { resolve } = require("path");
const { rejects } = require("assert");
var sql = require("../models/database");
const { GetData } = require("../models/database");
app.use(express.urlencoded({ extended: true }));

async function getAbout(req, res) {
    res.render("about");
}

module.exports = {
    getAbout: getAbout,
};
