import express from "express";
import { getGadgets, addGadget, selfDestruct, deleteGadget } from "../controllers/gadgetController";
import { authMiddleware } from "../middleware/auth";

// Create a new router instance
const router = express.Router();

// Define routes for gadgets with authentication middleware
router.get("/", authMiddleware, getGadgets);
router.post("/", authMiddleware, addGadget);
router.patch("/delete/:id", authMiddleware, deleteGadget);
router.post("/:id/self-destruct", authMiddleware, selfDestruct);

// Export the router as the default export
export default router;
