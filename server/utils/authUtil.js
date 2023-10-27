const jwt = require("jsonwebtoken");
const createToken = (id) => {
    return jwt.sign({id},'supersecret',{
        expiresIn: '1h'
    });
}

module.exports = {
    createToken
}