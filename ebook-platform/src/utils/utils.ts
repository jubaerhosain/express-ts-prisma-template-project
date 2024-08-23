import * as bcrypt from 'bcrypt';

async function hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

async function verifyPassword(password: string, hashedPassword: string) {
    const passwordMatches = await bcrypt.compare(password, hashedPassword);
    return passwordMatches;
}

function generateJwtToken(obj: object) {
    // const token = jwt.sign(obj, config.jwt.secret, {
    //     expiresIn: process.env.JWT_EXPIRY,
    // });
    // return token;
}

function verifyJwtToken(token: string) {
    // try {
    //     const decoded = jwt.verify(token, config.jwt.secret);
    //     return decoded;
    // } catch (err) {
    //     // console.log(err.message);
    //     return false;
    // }
}

export default { hashPassword, verifyPassword, generateJwtToken, verifyJwtToken };
