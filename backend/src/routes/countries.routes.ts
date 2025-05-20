import { Router } from 'express';
import { getCountries, getCountry } from '../controllers/countries.controller';

const router = Router();

router.get('/', getCountries);           // Hämtar alla länder
router.get('/:name', getCountry);        // Hämtar ett land baserat på namn

export default router;
