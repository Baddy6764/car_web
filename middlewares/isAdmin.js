const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }
  jwt.verify(token, process.env.JWT_TOKEN_PASSWORD, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }
    if (user.role !== true) {
      return res.status(403).json({ error: "Admin access required" });
    }
    req.user = user;
    next();
  });
};


