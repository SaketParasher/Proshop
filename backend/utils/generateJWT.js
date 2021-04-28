const jwt = require("jsonwebtoken");

module.exports.getJWTToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:'1h'});
}