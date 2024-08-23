const { check, validationResult } = require("express-validator");

const doLoginValidator = [
    check("username").isLength({ min: 1 }).withMessage("Required email or phone number"),
    check("password").isLength({ min: 1 }).withMessage("Required password"),
];

function doLoginValidationHandler(req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        // stay on login page if any error is found
        res.render("index", {
            data: {
                username: req.body.username,
            },
            errors: mappedErrors,
        });
    }
}

module.exports = {
    doLoginValidator,
    doLoginValidationHandler,
};
