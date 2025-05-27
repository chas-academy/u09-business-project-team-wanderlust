import express from 'express';
import { ensureAuthenticated } from '../middleware/auth';

const router = express.Router();

router.get('/profile', ensureAuthenticated, (req, res) => {
    res.json({ user: req.user });
});