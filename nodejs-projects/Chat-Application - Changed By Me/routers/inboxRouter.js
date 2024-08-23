const express = require("express");
const router = express.Router();
const { getInbox } = require("../controllers/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const checkLoggedIn = require("../middlewares/common/checkLoggedIn");



// inbox page
router.get("/", decorateHtmlResponse("Inbox"), checkLoggedIn, getInbox);

module.exports = router;
