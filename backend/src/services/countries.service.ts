import fetch from 'node-fetch';

const BASE_API_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = async () => {
    const response = await fetch(`${BASE_API_URL}/all`);
    if (!response.ok) {
        throw new Error('Hämtning av länder misslyckades');
    }
    return await response.json();
};

export const getCountryByName = async (name: string) => {
    const response = await fetch(`${BASE_API_URL}/name/${name}`);
    if (!response.ok) {
        throw new Error(`Hämtning av ${name} misslyckades`);
    }

    const data = await response.json();

    // Filtrera bort delmatchningar
    const exactMatch = data.find((country: any) =>
        country.name.common.toLowerCase() === name.toLowerCase()
    );

    if (!exactMatch) {
        throw new Error(`Land med namn "${name}" hittades inte`);
    }

    return exactMatch;
};

export const getCountryByCode = async (code: string) => {
    const response = await fetch(`${BASE_API_URL}/alpha/${code}`);
    if (!response.ok) {
        throw new Error(`Kan inte hämta land med kod: ${code}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data[0] : data;
};

export const compareCountries = async (name1: string, name2: string) => {
    const [country1, country2] = await Promise.all([
        getCountryByName(name1),
        getCountryByName(name2)
    ]);

    return {
        countries: [country1.name.common, country2.name.common],
        region: [country1.region, country2.region],
        population: [country1.population, country2.population],
        currencies: [
            Object.keys(country1.currencies || {})[0],
            Object.keys(country2.currencies || {})[0],
        ]
    }
};