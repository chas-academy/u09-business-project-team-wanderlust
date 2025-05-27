import express from "express";
import { connectDB } from './config/db';
import countryRoutes from './routes/countries.routes'
import userRoutes from './routes/user.routes';
import listRoutes from './routes/list.routes';
import cors from 'cors';
import expressSession from 'express-session';
import passport from "passport";
import './middleware/passport';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors({
  origin: [
    'http://localhost:5173',
    "https://u09-team-wanderlust-frontend.netlify.app"
  ]
}));

app.use(express.json());
app.use('/api/countries', countryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lists', listRoutes);

app.get("/", (req, res) => {
    res.send("Backend page is live!");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.use(expressSession({ secret: 'hemligt', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Auth routes
app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Skicka vidare till frontend efter inloggning
    res.redirect('http://localhost:5173/dashboard'); // ändra efter din frontend-URL
  });