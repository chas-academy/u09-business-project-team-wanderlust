import express from 'express';
import passport from 'passport';
import { Request, Response } from 'express';

const router = express.Router();

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));

router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: frontendUrl,
    successRedirect: `${frontendUrl}/profil`
  })
);

router.get("/logout", (req: Request, res: Response, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.sendStatus(200);
  });
});

router.get("/user", (req: Request, res: Response) => {
  res.json(req.user || null);
});

export default router;
