import { Router } from 'express';
import { getCountries, getCountry, compare } from '../controllers/countries.controller';

const router = Router();

router.get('/', getCountries); // Hämtar alla länder
router.get('/:name', getCountry); // Hämtar ett land baserat på namn
router.get('/compare/:name1/:name2', compare); // Jämför två länder med varandra

export default router;
