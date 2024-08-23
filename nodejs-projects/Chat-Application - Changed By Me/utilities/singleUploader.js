const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

function formatFileName(name) {
    const file_extension = path.extname(name);
    const file_name = name.replace(file_extension, "").toLowerCase().split(" ").join("-") + Date.now() + file_extension;
    return file_name;
}

function singleUploader(subfolder_path, allowed_file_types, max_file_size, error_message) {
    const upload_folder = path.join(__dirname, `../public/uploads/${subfolder_path}/`);

    // define storage
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, upload_folder);
        },
        filename: (req, file, cb) => {
            const formatted_file_name = formatFileName(file.originalname);
            cb(null, formatted_file_name);
        },
    });

    // final upload object
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: max_file_size,
        },
        fileFilter: (req, file, cb) => {
            if (allowed_file_types.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(createError(error_message));
            }
        },
    });

    return upload;
}

module.exports = singleUploader;
