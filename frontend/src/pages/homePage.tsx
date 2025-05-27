import {useEffect, useState } from 'react';
import type { Country } from '../types/Country';

const HomePage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // till för sökning via namn
  const [searchTerm, setSearchTerm] = useState("");
  const [singleCountry, setCountry] = useState<Country | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
  fetchCountries();
}, []);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3000/api/countries');
      if (!response.ok) throw new Error("Kunde inte hämta länder");
      const data = await response.json();

      const sortedData = data.slice().sort((a: Country, b: Country) => a.name.localeCompare(b.name));

      setCountries(sortedData);
    } catch (err: any) {
      setError(err.message || "Ett fel inträffade");
    } finally {
      setLoading(false);
    }
  };

  const fetchCountry = async (name: string) => {
    if (!name.trim()) {
      setSearchError("Ange ett land att söka efter");
      setCountry(null);
      return;
    }
    try {
      setLoading(true);
      setSearchError(null);
      const response = await fetch(`http://localhost:3000/api/countries/${name}`);
      if (!response.ok) throw new Error("Kunde inte hitta landet");

      const data = await response.json();
      setCountry(data);
    } catch (err: any) {
      setSearchError(err.message || "Ett fel inträffade vid sökning");
      setCountry(null);
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Välkommen till Wanderlust!</h1>
      <p className="mb-4">
        Här kan du söka efter länder och som inloggad användare skapa egna listor!
        Börja planera dina semesterdrömmar redan nu.
      </p>
      <p className="mb-6">
        Utforska flaggor, landskoder och intressanta fakta om varje land.
        Spara dina favoritdestinationer och skapa personliga reseplaner.
      </p>

      {/* Sökfält */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Sök land..."
          className="border px-2 py-1 rounded flex-grow"
        />
        <button
          onClick={() => fetchCountry(searchTerm)}
          className="bg-green-500 text-white px-4 py-1 rounded"
        >
          Sök
        </button>
      </div>

      {/* Visar sökresultatet */}
      {searchError && <p className="text-red-600 mb-4">{searchError}</p>}
      {singleCountry && (
        <div className="mb-6 border rounded p-4 shadow">
          <h2 className="text-xl font-bold mb-2">{singleCountry.name}</h2>
          <p>Kod: {singleCountry.code}</p>
          <p>Region: {singleCountry.region}</p>
          <p>Befolkning: {singleCountry.population.toLocaleString()}</p>
          <img
            src={singleCountry.flag}
            alt={singleCountry.name}
            className="mt-2 h-20"
          />
        </div>
      )}

      {/* Knappar och status */}
      <button
        onClick={fetchCountries}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Hämta alla länder
      </button>
      {loading && <p>Laddar...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Lista med alla länder */}
      {!loading && !error && countries.length > 0 && (
        <div
          style={{ maxHeight: "400px", overflowY: "auto" }}
          className="border border-gray-300 rounded p-4"
        >
          <ul className="country-list grid grid-cols-2 md:grid-cols-4 gap-4">
            {countries.map((country) => (
              <li
                key={country.code}
                className="border rounded p-2 shadow text-center"
              >
                <h2 className="text-sm font-semibold mb-1">{country.name}</h2>
                <p className="text-gray-500 text-xs mb-2">{country.code}</p>
                <div className="flag-container">
                  <img src={country.flag} alt={country.name} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage;