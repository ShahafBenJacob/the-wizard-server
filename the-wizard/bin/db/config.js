const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "Sby@142089",
    database: "wizard",
    port: "3306",
    multipleStatements: true
});


module.exports = connection;