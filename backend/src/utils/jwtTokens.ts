const jwt = require("jsonwebtoken");

// Secret key for signing the token
const secretKey = "your-secret-key";

// Function to generate a JWT token
function generateToken(payload, expiresIn) {
  const options = { expiresIn };
  return jwt.sign(payload, secretKey, options);
}

// Function to verify a JWT token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded token data:", decoded);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      console.log("Token has expired");
    } else {
      console.log("Token is not valid:", err.message);
    }
  }
}
