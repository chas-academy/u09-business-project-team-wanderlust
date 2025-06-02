import { Router } from "express";
import { addToList, removeFromList, getUserList, getUserListController } from "../controllers/list.controller";

const router = Router();

// Ex: /api/lists/:userId/favorites/SE
router.post("/:userId/:type", addToList);
router.delete("/:userId/:type", removeFromList);
// router.get('/details/:userId/:type', getUserListController);

router.get('/test', (req, res) => {
  res.send('Test route works!');
});

router.get('/details/:userId/:type', (req, res, next) => {
  console.log('PARAMS:', req.params);
  next();
}, getUserListController);

export default router;
