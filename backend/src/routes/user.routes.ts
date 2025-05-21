import { Router } from "express";
import {
    addFave,
    addTravel,
    compare
} from '../controllers/user.controller';

const router = Router();

router.post('/:id/favorites/:code', addFave);
router.post('/:id/travels/:code', addTravel)
router.get('/compare/:name1/:name2', compare);

export default router;