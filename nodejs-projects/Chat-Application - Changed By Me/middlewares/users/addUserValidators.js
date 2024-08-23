const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const User = require("../../models/Person");
const fs = require("fs");
const path = require("path");

async function emailExists(value) {
    try {
        const user = await User.findOne({ email: value });
        if (user) {
            throw createError("Email in use");
        }
    } catch (err) {
        throw createError(err.message);
    }
}

async function mobileExists(value) {
    try {
        const user = await User.findOne({ mobile: value });
        if (user) {
            throw createError("Mobile in use");
        }
    } catch (err) {
        throw createError(err.message);
    }
}

const addUserValidators = [
    check("name")
        .isLength({ min: 1 })
        .withMessage("Name is required")
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("Name must not contains other than alphabets")
        .trim(),
    check("email")
        .isLength({ min: 1 })
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is not valid")
        .custom(emailExists),
    check("mobile")
        .isMobilePhone("bn-BD", { strictMode: true })
        .withMessage("Mobile number must be a Bangladeshi number")
        .custom(mobileExists),
    check("password")
        .isStrongPassword()
        .withMessage(
            "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
        ),
];

function addUserValidationHandler(req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    // returns an array of keys
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        // remove uploaded file
        if (req.files.length > 0) {
            const { filename } = req.files[0];
            const file_path = path.join(__dirname, `../../public/uploads/avatars/${filename}`);
            fs.unlink(file_path, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }

        // response the errors
        res.status(400).json({
            errors: mappedErrors,
        });
    }
}

module.exports = {
    addUserValidators,
    addUserValidationHandler,
};
