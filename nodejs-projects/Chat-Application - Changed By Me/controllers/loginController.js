const User = require("../models/Person");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// get login page
function getLogin(req, res, next) {
    res.render("index");
}

// do login
async function doLogin(req, res, next) {
    try {
        var username = req.body.username;
        var password = req.body.password;

        // username can be email or phone number
        const user = await User.findOne({
            $or: [{ email: username }, { mobile: username }],
        });

        if (user && user._id) {
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (isValidPassword) {
                // prepare user object to generate token
                const userObj = {
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    role: "user",
                };

                // generate token
                const token = jwt.sign(userObj, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY,
                });

                // set cookie
                res.cookie(process.env.COOKIE_NAME, token, {
                    httpOnly: true,
                    maxAge: process.env.JWT_EXPIRY,
                    signed: true,
                });

                // set loggedInUser
                res.locals.loggedInUser = userObj;

                // render inbox page
                res.render("inbox");
            } else {
                throw createError("Invalid password");
            }
        } else {
            throw createError("Invalid username");
        }
    } catch (err) {
        // stay on same page if login fails
        res.render("index", {
            data: {
                username,
            },
            errors: {
                common: {
                    msg: err.message,
                },
            },
        });
    }
}

// do logout
function doLogout(req, res) {
    res.clearCookie(process.env.COOKIE_NAME);
    res.send("logged out");
}

module.exports = {
    getLogin,
    doLogin,
    doLogout,
};
