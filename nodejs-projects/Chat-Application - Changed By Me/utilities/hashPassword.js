const bcrypt = require("bcrypt");

async function hashPassword(password) {
    const hashed_password = await bcrypt.hash(password, 10);
    return hashed_password;
}

module.exports = hashPassword;
