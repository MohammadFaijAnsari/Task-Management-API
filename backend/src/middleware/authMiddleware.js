const jwt = require("jsonwebtoken");
const JWT_SECRET = "faij1234";

const verifyToken = (req, res, next) => {
  try {
    
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized: No token" });

    // Token verify
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // decoded info ko request me attach kar dete hain
    next(); // next middleware ya route run ho
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyToken;
