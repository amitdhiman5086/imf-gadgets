import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Secret key for JWT verification
const SECRET = process.env.JWT_SECRET || "supersecret";

// Extend the Request interface to include user information
interface AuthRequest extends Request {
  user?: { userId: string };
}

// Middleware to authenticate requests using JWT
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    // Extract token from Authorization header
    const token = req.header("Authorization")?.split(" ")[1];

    // If no token is found, deny access
    if (!token) {
      res.status(401).json({ error: "Access denied" });
      return; // Exit function
    }

    // Verify token and attach user info to request
    const decoded = jwt.verify(token, SECRET) as { userId: string };
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle invalid token error
    res.status(401).json({ error: "Invalid token" });
    return; // Exit function
  }
};
