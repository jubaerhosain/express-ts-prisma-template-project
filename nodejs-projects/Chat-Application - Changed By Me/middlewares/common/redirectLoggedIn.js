const jwt = require("jsonwebtoken");

// redirect to the inbox when logged in user want to login again
// if user is not logged in, pass to the next

// put after decorateHtmlResponse
function redirectLoggedIn(req, res, next) {
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

            // means current user is logged in
            res.redirect("/inbox");
        } catch {
            next();
        }
    } else {
        next();
    }
}

module.exports = redirectLoggedIn;
