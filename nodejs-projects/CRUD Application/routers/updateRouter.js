const crudConnection = require("../connections/crudConnection");

function makeUpdateSql(data, param) {
    const s1 = "UPDATE students SET ";
    var s2 = "";
    const size = Object.keys(data).length;
    Object.keys(data).forEach((key, index) => {
        if (index === size - 1) s2 += `${key}='${data[key]}' `;
        else s2 += `${key}='${data[key]}', `;
    });

    const s3 = ` WHERE email = '${param}';`;

    return s1 + s2 + s3;
}

function updateRouter(req, res, next) {
    const updateSql = makeUpdateSql(req.body, req.params.email);
    
    crudConnection.query(updateSql, function (err, result) {
        if (err) {
            throw err;
        }

        console.log("Updated successfully");
        res.json({
            message: "Updated successfully",
        });
    });
}

module.exports = updateRouter;
