import { Router } from "express";
import { addToList, removeFromList, getUserList } from "../controllers/list.controller";

const router = Router();

// Ex: /api/lists/:userId/favorites/SE
router.post("/:userId/:type/:code", addToList);
router.delete("/:userId/:type/:code", removeFromList);
router.get("/:userId/:type", getUserList);

export default router;
