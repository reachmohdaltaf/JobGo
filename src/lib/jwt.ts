import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

// Function to sign a JWT token
export function signJwtToken(payload) {
  try {
    const token = jwt.sign(payload, secret, { expiresIn: "7d" });
    return token;
  } catch (error) {
    console.error("JWT Sign Error:", error);
    return null;
  }
}

// Function to verify a JWT token
export function verifyJwtToken(token) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.error("JWT Verify Error:", error);
    return null;
  }
}
