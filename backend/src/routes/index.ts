import express from 'express';
import countriesRoutes from './countries.routes';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/countries', countriesRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
