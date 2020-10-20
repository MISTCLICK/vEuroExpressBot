const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { SQLpassword, SQLuser } = require('../config.json');

let app = express();
app.use(bodyParser.json());
    
let mysqlConnection = mysql.createConnection({
    host: "92.63.97.211",
    user: SQLuser,
    password: SQLpassword,
    database: "vam_db",
    multipleStatements: true,
    port: 3891
});
    
mysqlConnection.connect((err) => {
    if (err) {
        console.error(err)
    } else {
        console.log('mySQL Connection successfully established.');
    }
});

app.listen(mysqlConnection.port);

module.exports = mysqlConnection;