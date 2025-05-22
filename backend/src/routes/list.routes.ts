import { Router } from "express";
import { addToList, removeFromList, getUserList, getUserListController } from "../controllers/list.controller";

const router = Router();

// Ex: /api/lists/:userId/favorites/SE
router.post("/:userId/:type", addToList);
router.delete("/:userId/:type", removeFromList);
router.get('/:userId/:type', getUserListController);

export default router;
