const crudConnection = require("../connections/crudConnection");

function insertRouter(req, res, next) {
    const insertSQL = `INSERT INTO students (firstname, lastname, roll, email)
    VALUES('${req.body.firstname}', '${req.body.lastname}', '${req.body.roll}', '${req.body.email}');`;

    crudConnection.query(insertSQL, function (err, result) {
        if (err) {
            throw err;
        }
        console.log("Inserted successfully");
        res.json({
            message: "Inserted successfully",
        });
    });
}

module.exports = insertRouter;
