const jwt = require("jsonwebtoken");
const isValidAuth = (userId, token) => {
    if (!token) {
        return false
    }
    const decodedToken = jwt.verify(token, 'SuperSecret');

    return decodedToken.userId.toString() === userId;
}

const isValidToken = (token) => {
    if (!token) {
        return false
    }
    const decodedToken = jwt.verify(token, 'SuperSecret');

    return !!decodedToken.userId;
}
module.exports = { isValidAuth, isValidToken };