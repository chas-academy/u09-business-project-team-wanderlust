import { Request, Response } from 'express';
import { getAllCountries, getCountryByName, compareCountries } from '../services/countries.service';

export const getCountries = async (req: Request, res: Response): Promise<any> => {
    try {
        const countries = await getAllCountries();
        const filtered = countries.map((c: any) => ({
        name: c.name.common,
        code: c.cca2,
        flag: c.flags.svg,
        }));
        res.status(200).json(filtered);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Något gick fel vid hämtning av länder' });
    }
};

export const getCountry = async (req: Request, res: Response): Promise<any> => {
    const { name } = req.params;
    try {
        const country = await getCountryByName(name);

        const filtered = {
            name: country.name.common,
            code: country.cca2,
            flag: country.flags.svg,
            region: country.region,
            population: country.population,
            currency: country.currency
        };

        res.status(200).json(filtered);
    } catch (error: any) {
        res.status(404).json({ error: error.message || `Något gick fel vid hämtning av ${name}` });
    }
};

export const compare = async (req: Request, res: Response) => {
    try{
        const result = await compareCountries(req.params.name1, req.params.name2);
        res.status(200).json(result);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
