import React, {useEffect, useState } from 'react';
import type { Country } from '../types/Country';

const HomePage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

return (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-6">Välkommen till Wanderlust!</h1>
    <p className="mb-4">
      Här kan du söka efter länder och som inloggad användare skapa egna listor!
      Börja planera dina semesterdrömmar redan nu.
    </p>
    <p className="mb-4">
      Utforska flaggor, landskoder och intressanta fakta om varje land.
      Spara dina favoritdestinationer och skapa personliga reseplaner.
    </p>
    <p className="mb-6">
      Logga in för att få tillgång till dina listor på alla enheter!
    </p>

    <button
      onClick={fetchCountries}
      className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
    >
      Hämta alla länder
    </button>

    {loading && <p>Laddar länder...</p>}
    {error && <p className="text-red-600">{error}</p>}

    {!loading && !error && countries.length > 0 && (
<div
          style={{ maxHeight: '400px', overflowY: 'auto' }}
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