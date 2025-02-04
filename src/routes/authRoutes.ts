import express from "express";
import { signup, login } from "../controllers/authController";

// Create a new router instance
const router = express.Router();

// Define routes for signup and login
router.post("/signup", signup);
router.post("/login", login);

// Export the router as the default export
export default router;
