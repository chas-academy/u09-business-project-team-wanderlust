import { useEffect, useState } from "react";
import type { Country } from "../types/Country";

type CompareResult = {
    countries: [string, string];
    region: [string, string];
    population: [number, number];
    currencies: [string, string];
};

const CompareCountriesPage = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [selected1, setSelected1] = useState('');
    const [selected2, setSelected2] = useState('');
    const [compareResult, setCompareResult] = useState<CompareResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [compareLoading, setCompareLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
    try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/countries');
        if (!response.ok) throw new Error('Kunde inte hämta länder');
        const data: Country[] = await response.json();
        setCountries(data.sort((a, b) => a.name.localeCompare(b.name)));
        } catch (err: any) {
        setError(err.message || 'Ett fel inträffade');
        } finally {
        setLoading(false);
        }
    };

    const compareCountries = async () => {
        if (!selected1 || !selected2) {
            setError('Välj två länder att jämföra');
            return;
        }
        
        if (selected1 === selected2) {
            setError('Välj två olika länder');
            return;
        }

    try {
        setError(null);
        setCompareResult(null);
        setCompareLoading(true);
        const response = await fetch(
            `http://localhost:3000/api/countries/compare/${selected1}/${selected2}`
        );
        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || 'Fel vid jämförelse');
        }
        const data: CompareResult = await response.json();
        setCompareResult(data);
        } catch (err: any) {
        setError(err.message || 'Något gick fel vid jämförelsen');
        } finally {
        setCompareLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Jämför två länder</h1>

        {loading && <p>Laddar länder...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
                <label htmlFor="country1" className="block mb-1 font-semibold">
                Land 1
                </label>
                <select
                id="country1"
                value={selected1}
                onChange={(e) => setSelected1(e.target.value)}
                className="w-full border rounded px-2 py-1"
                >
                <option value="">Välj land</option>
                {countries.map((c) => (
                    <option key={c.code} value={c.name}>
                    {c.name}
                    </option>
                ))}
                </select>
            </div>

            <div>
                <label htmlFor="country2" className="block mb-1 font-semibold">
                Land 2
                </label>
                <select
                id="country2"
                value={selected2}
                onChange={(e) => setSelected2(e.target.value)}
                className="w-full border rounded px-2 py-1"
                >
                <option value="">Välj land</option>
                {countries.map((c) => (
                    <option key={c.code} value={c.name}>
                    {c.name}
                    </option>
                ))}
                </select>
            </div>

            <div>
                <button
                onClick={compareCountries}
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                disabled={compareLoading}
                >
                {compareLoading ? 'Jämför...' : 'Jämför'}
                </button>
            </div>
            </div>
        )}

        {compareResult && (
            <div className="border rounded p-4 bg-gray-50 shadow">
            <h2 className="text-2xl font-semibold mb-4">Resultat</h2>
            <table className="w-full text-left">
                <thead>
                <tr>
                    <th></th>
                    <th>{compareResult.countries[0]}</th>
                    <th>{compareResult.countries[1]}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="font-semibold">Region</td>
                    <td>{compareResult.region[0]}</td>
                    <td>{compareResult.region[1]}</td>
                </tr>
                <tr>
                    <td className="font-semibold">Befolkning</td>
                    <td>{compareResult.population[0].toLocaleString()}</td>
                    <td>{compareResult.population[1].toLocaleString()}</td>
                </tr>
                <tr>
                    <td className="font-semibold">Valuta</td>
                    <td>{compareResult.currencies[0]}</td>
                    <td>{compareResult.currencies[1]}</td>
                </tr>
                </tbody>
            </table>
            </div>
        )}
        </div>
    );
};

export default CompareCountriesPage;