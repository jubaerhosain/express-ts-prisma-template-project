const crudConnection = require("../connections/crudConnection");

function deleteRouter(req, res, next) {
    const deleteSql = `DELETE FROM students WHERE email='${req.params.email}';`;

    crudConnection.query(deleteSql, function (err, result) {
        if (err) {
            throw err;
        }

        res.json({
            message: "Deleted successfully",
        });
    });
}

module.exports = deleteRouter;
