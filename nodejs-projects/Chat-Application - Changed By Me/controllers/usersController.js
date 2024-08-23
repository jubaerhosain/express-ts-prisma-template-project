const User = require("../models/Person");
const hashPassword = require("../utilities/hashPassword");
const fs = require("fs");
const path = require("path");

// get users page
async function getUsers(req, res, next) {
    try {
        const users = await User.find();
        res.render("users", {
            users: users,
        });
    } catch (err) {
        next(err);
    }
}

// add user
async function addUser(req, res, next) {
    const hashed_password = await hashPassword(req.body.password);
    let newUser;

    if (req.files && req.files.length > 0) {
        newUser = new User({
            ...req.body,
            password: hashed_password,
            avatar: req.files[0].filename,
        });
    } else {
        newUser = new User({
            ...req.body,
            password: hashed_password,
        });
    }

    // save to database
    try {
        await newUser.save();
        res.status(200).json({
            message: "User was successfully added",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            errors: {
                common: {
                    msg: err.message,
                },
            },
        });
    }
}

// remove user
async function removeUser(req, res, next) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        // remove avatar
        if (user.avatar) {
            const file_path = path.join(__dirname, `../public/uploads/avatars/${user.avatar}`);
            fs.unlink(file_path, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }

        res.status(200).json({
            message: "User was successfully removed",
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: "Could not remove user",
                },
            },
        });
    }
}

module.exports = {
    getUsers,
    addUser,
    removeUser,
};
