const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Middleware function to check if a token is valid and attach user data to the request
const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  //const token = req.header("Authorization");

// split token
const token = req.headers.authorization.split(' ')[1];


  // Check if a token exists
  if (!token) {
    return res.status(401).json({ error: "Access denied. Token missing." });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user data to the request for further use in protected routes
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token. Access denied." });
  }
};

module.exports = authMiddleware;
