import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecret";

interface AuthRequest extends Request {
  user?: { userId: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Access denied" });
      return; // Ensure function exits
    }

    const decoded = jwt.verify(token, SECRET) as { userId: string };
    req.user = decoded;

    next(); // Call next() to continue request processing
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
    return; // Ensure function exits
  }
};
