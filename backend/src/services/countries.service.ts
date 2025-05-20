import fetch from 'node-fetch';

const API_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = async () => {
    const response = await fetch(`${API_URL}/all`);
    if (!response.ok) {
        throw new Error('Hämtning av länder misslyckades');
    }
    return await response.json();
};

export const getCountryByName = async (name: string) => {
    const response = await fetch(`${API_URL}/name/${name}`);
    if (!response.ok) {
        throw new Error(`Hämtning av ${name} misslyckades`);
    }
    return await response.json();
};