import express from "express";
import { connectDB } from './config/db';
import countryRoutes from './routes/countries.routes'
import userRoutes from './routes/user.routes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use('/api/countries', countryRoutes);
app.use('/api/users', userRoutes);

app.get("/", (req, res) => {
    res.send("Backend page is live!");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
