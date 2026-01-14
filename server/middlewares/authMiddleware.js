const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; //Bearer header.payload.signature
        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = verifiedToken.userId;
        next();
    } catch (error) {
        return res.status(401).send({ message: error });
    }
};

module.exports = auth;