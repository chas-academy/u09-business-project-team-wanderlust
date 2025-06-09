import express, { Request, Response } from "express";
import { connectDB } from './config/db';
import countryRoutes from './routes/countries.routes';
import userRoutes from './routes/user.routes';
import listRoutes from './routes/list.routes';
import protectedRoutes from './routes/protected.routes';
import cors from 'cors';
import expressSession from 'express-session';
import passport from "passport";
import './middleware/passport';
import dotenv from 'dotenv';

import authRoutes from "./routes/auth.routes";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  "https://u09-team-wanderlust-frontend.netlify.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// Session och Passport (måste komma innan routes som använder auth)
app.use(
  expressSession({ 
    secret: 'hemligt', 
    resave: false, 
    saveUninitialized: false,
    cookie: { /*
      secure: true,
      sameSite: "none"*/
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Root route
app.get("/", (req, res) => {
    res.send("Backend page is live!");
});

// Routes
app.use('/api/countries', countryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/protected', protectedRoutes);
app.use("/api/auth", authRoutes);
/*
// Auth routes
app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"],
}));

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: frontendUrl,
    successRedirect: `${frontendUrl}/profil`
  })
);

app.get("/auth/logout", (req: Request, res: Response, next) => {
    req.logout(err => {
        if (err) return next(err);
        res.sendStatus(200);
    });
});

app.get("/auth/user", (req: Request, res: Response) => {
    res.json(req.user || null);
});*/

// Starta servern - efter alla middleware och routes är registrerade
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
