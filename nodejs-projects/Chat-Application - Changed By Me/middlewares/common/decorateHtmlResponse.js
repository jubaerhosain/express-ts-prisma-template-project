function decorateHtmlResponse(pate_title) {
    return function (req, res, next) {
        res.locals.html = true;
        res.locals.title = `${pate_title} - ${process.env.APP_NAME}`;
        res.locals.loggedInUser = {};
        res.locals.data = {};
        res.locals.errors = {};
        next();
    };
}

module.exports = decorateHtmlResponse;
