const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, Authorization Denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not Valid" });
  }
};
