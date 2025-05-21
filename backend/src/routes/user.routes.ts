import { Router } from "express";
import {
    addFave,
    removeFave,
    addTravel,
    removeTravel,
    compare
} from '../controllers/user.controller';

const router = Router();

// FAVORITLÄNDER
router.post('/:id/favorites/:code', addFave);
router.delete('/:id/favorites/:code', removeFave);

// RESPLANER
router.post('/:id/travels/:code', addTravel)
router.delete('/:id/travels/:code', removeTravel);

// JÄMFÖR LÄNDER
router.get('/compare/:name1/:name2', compare);

export default router;