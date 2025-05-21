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
