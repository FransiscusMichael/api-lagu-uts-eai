require("dotenv").config();
const jsonwebtoken = require("jsonwebtoken");

const tokenMiddleware = (req, res, next) => {
  const tokenMiddleware = req.headers.authorization;
  if (tokenMiddleware) {
    const token = tokenMiddleware.split(" ")[1];
    jsonwebtoken.verify(token, process.env.KUNCI_JSONWEBTOKEN, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: 403,
          timestamp: new Date().toLocaleTimeString(),
          message: "Token tersebut invalid",
        });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({
      status: 401,
      timestamp: new Date().toLocaleTimeString(),
      message: "Login untuk mendapatkan token",
    });
  }
};

module.exports = tokenMiddleware;
