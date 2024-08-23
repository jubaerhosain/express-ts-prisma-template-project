const jwt = require("jsonwebtoken");

// send failed response
function sendFailedResponse(res) {
    if (res.locals.html) {
        // redirect to the login page
        res.redirect("/");
    } else {
        res.status(500).json({
            errors: {
                common: {
                    msg: "Authentication failed",
                },
            },
        });
    }
}

// checks logged in or not
// put after decorateHtmlResponse
function checkLoggedIn(req, res, next) {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    if (cookies) {
        try {
            const token = cookies[process.env.COOKIE_NAME];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // this data may be useful later for json response
            req.user = decoded;

            if (res.locals.html) {
                res.locals.loggedInUser = decoded;
            }

            next();
        } catch {
            sendFailedResponse(res);
        }
    } else {
        sendFailedResponse(res);
    }
}

module.exports = checkLoggedIn;
