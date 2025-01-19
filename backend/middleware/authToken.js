const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    // Ensure the token exists
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        message: "Authentication required. Please log in.",
        error: true,
        success: false,
      });
    }

    // Verify the token
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error("JWT verification error:", err.message);
        return res.status(401).json({
          message: "Invalid or expired token. Please log in again.",
          error: true,
          success: false,
        });
      }

      // Attach the user ID to the request object for downstream use
      req.userId = decoded?._id;

      // Proceed to the next middleware or route handler
      next();
    });
  } catch (err) {
    console.error("Authentication middleware error:", err.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
