const express = require("express");
const router = express.Router();
const { getLogin, doLogin, doLogout } = require("../controllers/loginController");
const { doLoginValidator, doLoginValidationHandler } = require("../middlewares/login/loginValidators");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const redirectLoggedIn = require("../middlewares/common/redirectLoggedIn");

const page_title = "Login";

// login page
router.get("/", decorateHtmlResponse(page_title), redirectLoggedIn, getLogin);

// do login
router.post("/", decorateHtmlResponse(page_title), doLoginValidator, doLoginValidationHandler, doLogin);

// do logout
router.delete("/", doLogout);

module.exports = router;
