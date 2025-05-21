import React, {useEffect, useState } from 'react';
import type { Country } from '../types/Country';

const HomePage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3000/api/countries');
      if (!response.ok) throw new Error("Kunde inte hämta länder");
      const data = await response.json();
      setCountries(data);
    } catch (err: any) {
      setError(err.message || "Ett fel inträffade");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to Wanderlust!</h1>

      <button
        onClick={fetchCountries}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Hämta länder
      </button>

      {loading && <p>Laddar länder...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && countries.length > 0 && (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {countries.map((country) => (
            <li key={country.code} className="border rounded p-4 shadow">
              <img
                src={country.flag}
                alt={country.name}
                className="w-full h-24 object-cover rounded mb-2"
              />
              <h2 className="text-lg font-semibold">{country.name}</h2>
              <p className="text-gray-500">{country.code}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;