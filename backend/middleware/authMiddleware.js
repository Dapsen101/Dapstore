const jwt = require("jsonwebtoken");

// 🔐 Verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // contains id + isAdmin
    console.log("USER FROM TOKEN", req.user);
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// 🛡️ Admin only
const verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};

module.exports = { verifyToken, verifyAdmin };

// console.log(id: "...", isAdmin: true)
// console.log("USER FROM TOKEN", req.user);