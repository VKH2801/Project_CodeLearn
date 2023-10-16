const sql = require("mssql");
const config = require("./config");
var express = require("express");
var app = express();
app.use(express.json());

function GetData(strsql) {
  return new Promise(function (resolve, reject) {
    sql.connect(config, function (err, db) {
      if (err) console.log(err);
      var request = new sql.Request();
      request.query(strsql, (err, recordset) => {
        if (err) console.log(err);
        resolve(recordset.recordsets[0]);
      });
    });
  });
}
module.exports = {
  GetData: GetData,
};
