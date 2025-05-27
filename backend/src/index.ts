import express from "express";
import { connectDB } from './config/db';
import countryRoutes from './routes/countries.routes';
import userRoutes from './routes/user.routes';
import listRoutes from './routes/list.routes';
import protectedRoutes from './routes/protected.routes';
import cors from 'cors';
import expressSession from 'express-session';
import passport from "passport";
import './middleware/passport';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    "https://u09-team-wanderlust-frontend.netlify.app"
  ],
  credentials: true
}));

app.use(express.json());

// Session och Passport (måste komma innan routes som använder auth)
app.use(expressSession({ 
  secret: 'hemligt', 
  resave: false, 
  saveUninitialized: true,
  cookie: { secure: false } // sätt true om du kör HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/countries', countryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/protected', protectedRoutes);

// Auth routes
app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Skicka vidare till frontend efter lyckad inloggning
    res.redirect('http://localhost:5173/dashboard'); // ändra till din frontend-URL
  });

// Root route
app.get("/", (req, res) => {
    res.send("Backend page is live!");
});

// Starta servern - efter alla middleware och routes är registrerade
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
