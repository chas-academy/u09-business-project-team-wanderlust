import express, { Request, Response } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
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
app.set("trust proxy", 1);
const PORT = process.env.PORT || 3000;

connectDB();
const mongoUrl = process.env.MONGO_URI || "mongodb://localhost:27017/Wunderlust";
// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173'
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
    store: MongoStore.create({
      mongoUrl: mongoUrl,
      collectionName: "sessions",
    }),
    cookie: { /*
      secure: true,
      sameSite: "none"*/
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
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


// Starta servern - efter alla middleware och routes är registrerade
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
