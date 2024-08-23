const crudConnection = require("../connections/crudConnection");

function getOneRouter(req, res, next) {
    const sql = `SELECT * FROM students WHERE email = '${req.params.email}';`;

    crudConnection.query(sql, function (err, result) {
        if (err) {
            throw err;
        }

        const row = JSON.parse(JSON.stringify(result));
        res.json(row);
    });
}

function getAllRouter(req, res, next) {
    const sql = `SELECT * FROM students;`;

    crudConnection.query(sql, function (err, result) {
        if (err) {
            throw err;
        }

        const row = JSON.parse(JSON.stringify(result));
        res.json(row);
    });
}

module.exports = {
    getOneRouter,
    getAllRouter,
};
