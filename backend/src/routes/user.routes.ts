import { Router } from "express";
import {
    getUser,
    getUsers,
    compare
} from '../controllers/user.controller';

const router = Router();

// ANVÄNDARE
router.get('/:id', getUser);
router.get('/', getUsers);

// JÄMFÖR LÄNDER
router.get('/compare/:name1/:name2', compare);

export default router;