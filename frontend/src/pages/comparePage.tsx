import { useEffect, useState } from "react";
import type { Country } from "../types/Country";
import "./comparePageStyles.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

type CompareResult = {
    countries: [string, string];
    flags: [string, string];
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
            const response = await fetch(`${API_BASE_URL}/api/countries`);
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
            setCompareResult(null);
            return;
        }

        if (selected1 === selected2) {
            setError('Välj två olika länder');
            setCompareResult(null);
            return;
        }

        try {
            setError(null);
            setCompareResult(null);
            setCompareLoading(true);
            const response = await fetch(
                `${API_BASE_URL}/api/countries/compare/${selected1}/${selected2}`
            );
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Fel vid jämförelse');
            }
            const data: CompareResult = await response.json();
            setCompareResult(data);
        } catch (err: any) {
            setError(err.message || 'Något gick fel vid jämförelsen');
            setCompareResult(null);
        } finally {
            setCompareLoading(false);
        }
    };

    return (
        <div className="page-container">
            <h1 className="page-title">Jämför två länder</h1>

            {loading && <p>Laddar länder...</p>}

            {error && <p className="error">{error}</p>}

            {!loading && (
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="country1">Land 1</label>
                        <select
                            id="country1"
                            value={selected1}
                            onChange={(e) => {
                                setSelected1(e.target.value);
                                setError(null); // Rensa felmeddelande vid nytt val
                            }}
                        >
                            <option value="">Välj land</option>
                            {countries.map((c) => (
                                <option key={c.code} value={c.name}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="country2">Land 2</label>
                        <select
                            id="country2"
                            value={selected2}
                            onChange={(e) => {
                                setSelected2(e.target.value);
                                setError(null); // Rensa felmeddelande vid nytt val
                            }}
                        >
                            <option value="">Välj land</option>
                            {countries.map((c) => (
                                <option key={c.code} value={c.name}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <button onClick={compareCountries} disabled={compareLoading}>
                            {compareLoading ? 'Jämför...' : 'Jämför'}
                        </button>
                    </div>
                </div>
            )}

            {compareResult && (
                <div className="result-box">
                    <h2>Resultat</h2>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>{compareResult.countries[0]}</th>
                                <th>{compareResult.countries[1]}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <img src={compareResult.flags[0]} alt="Flagga 1" width="50" />
                                </td>
                                <td>
                                    <img src={compareResult.flags[1]} alt="Flagga 2" width="50" />
                                </td>
                            </tr>
                            <tr>
                                <td>Region</td>
                                <td>{compareResult.region[0]}</td>
                                <td>{compareResult.region[1]}</td>
                            </tr>
                            <tr>
                                <td>Befolkning</td>
                                <td>{compareResult.population[0].toLocaleString()}</td>
                                <td>{compareResult.population[1].toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>Valuta</td>
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
