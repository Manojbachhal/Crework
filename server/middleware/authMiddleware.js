const jwt = require("jsonwebtoken");
// const { UnauthorizedException } = require("exceptions"); // Make sure you define this or use a package
const { verifyTOken } = require("../controllers/userController");

const authMiddleware = async (req, res, next) => {
  let authHeader = req.headers["authorization"];

  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      let token = authHeader.split(" ")[1];

      let decodedUser = verifyTOken(token);

      req.user = decodedUser;
      next();
    } catch (error) {
      //   return res.status(401).json({ message: "Invalid Token or expired token" });
    }
  } else {
    // return res.status(401).json({ message: "Token not provided" });
  }
};

module.exports = authMiddleware;
