const express = require("express");
const router = express.Router();
const { getUsers, addUser, removeUser } = require("../controllers/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const { addUserValidators, addUserValidationHandler } = require("../middlewares/users/addUserValidators");
const checkLoggedIn = require("../middlewares/common/checkLoggedIn");

// users page
router.get("/", decorateHtmlResponse("Users"), checkLoggedIn, getUsers);

// add user
router.post("/", checkLoggedIn, avatarUpload, addUserValidators, addUserValidationHandler, addUser);

// remove user
router.delete("/:id", checkLoggedIn, removeUser);

module.exports = router;
