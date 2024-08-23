var mysql = require('mysql');

var crudConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "igl",
    database: "crud",
    multipleStatements: true,
});

crudConnection.connect(function(err) {
    if (err) {
        throw err;
    }
    console.log("Connected to MySql Server.");
});

module.exports = crudConnection;