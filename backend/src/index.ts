import express from "express";
import { connectDB } from './config/db';
import countryRoutes from './routes/countries.routes'

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use('/api/countries', countryRoutes);

app.get("/", (req, res) => {
    res.send("Backend page is live!");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
