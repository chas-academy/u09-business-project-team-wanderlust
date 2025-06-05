import { useEffect, useState } from 'react';
import type { Country } from '../types/Country';
import './homePageStyles.css';

const HomePage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div style={{ padding: '1.5rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem' }}>Välkommen till Wanderlust!</h1>
      <p style={{ marginBottom: '1rem' }}>
        Här kan du söka efter länder och som inloggad användare skapa egna listor!
        Börja planera dina semesterdrömmar redan nu.
      </p>
      <p style={{ marginBottom: '1.5rem' }}>
        Utforska flaggor, landskoder och intressanta fakta om varje land.
        Spara dina favoritdestinationer och skapa personliga reseplaner.
      </p>

      <div className="search-and-fetch-container">
        <div className="search-bar-group">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Sök land..."
          />
          <button className="search-btn" onClick={() => fetchCountry(searchTerm)}>
            Sök
          </button>
        </div>

        <button className="fetch-all-btn" onClick={fetchCountries}>
          Hämta alla länder
        </button>
      </div>

      {searchError && <p style={{ color: '#dc2626', marginBottom: '1rem' }}>{searchError}</p>}
      {singleCountry && (
        <div
          style={{
            marginBottom: '1.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            padding: '1rem',
            boxShadow: '0 1px 3px rgb(0 0 0 / 0.1)',
            position: 'relative'
          }}
        >
          <button
          onClick={() => setCountry(null)}
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            background: 'transparent',
            border: 'none',
            fontSize: '1.25rem',
            cursor: 'pointer',
            color: '#6b7280'
          }}
          aria-label="Stäng"
        >
          &times;
        </button>
          <h2>{singleCountry.name}</h2>
          <p>Kod: {singleCountry.code}</p>
          <p>Region: {singleCountry.region}</p>
          <p>Befolkning: {singleCountry.population.toLocaleString()}</p>
          <img
            src={singleCountry.flag}
            alt={singleCountry.name}
            style={{ marginTop: '0.5rem', height: '5rem', objectFit: 'contain' }}
          />
        </div>
      )}

      {loading && <p>Laddar...</p>}
      {error && <p style={{ color: '#dc2626' }}>{error}</p>}

      {!loading && !error && countries.length > 0 && (
        <div
          style={{
            maxHeight: '400px',
            overflowY: 'auto',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            padding: '1rem',
            backgroundColor: '#e5e7eb'
          }}
        >
          <ul className="country-list">
            {countries.map((country) => (
              <li key={country.code || country.name}>
                <h2 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  {country.name}
                </h2>
                <p style={{ color: '#6b7280', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                  {country.code}
                </p>
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