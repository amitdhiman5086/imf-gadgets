import express from "express";
import { getGadgets, addGadget, selfDestruct, deleteGadget } from "../controllers/gadgetController";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.get("/", authMiddleware, getGadgets);
router.post("/", authMiddleware, addGadget);
router.patch("/delete/:id", authMiddleware, deleteGadget);
router.post("/:id/self-destruct", authMiddleware, selfDestruct);

export default router;
