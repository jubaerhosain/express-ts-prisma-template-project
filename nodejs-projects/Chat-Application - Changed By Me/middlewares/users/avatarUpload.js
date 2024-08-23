const singleUploader = require("../../utilities/singleUploader");

function avatarUpload(req, res, next) {
    const upload = singleUploader(
        "avatars",
        ["image/jpeg", "image/jpg", "image/png", "image/gif"],
        2000000,
        "Only jpeg, jpg, png, and gif are supported."
    );

    // call the middleware function
    upload.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                errors: {
                    avatar: {
                        msg: err.message,
                    },
                },
            });
        } else {
            next();
        }
    });
}

module.exports = avatarUpload;
