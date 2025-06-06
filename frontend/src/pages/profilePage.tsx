import { useEffect, useState } from "react";
import { useUser, type User } from "../features/auth/UserContext";
import {
  fetchUserListWithDetails,
  removeCountryFromList,
  addCountryToList,
  moveCountryBetweenLists,
} from "../api/listApi";
import { fetchAllCountries } from "../api/countryApi";
import type { Country } from "../types/Country";
import "./profilePageStyles.css";

export const ProfilePage = () => {
  const { user } = useUser() as { user: User | null };
  const [name, setName] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Country[]>([]);
  const [travels, setTravels] = useState<Country[]>([]);
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [selectedCode, setSelectedCode] = useState("SE");
  const [selectedList, setSelectedList] = useState<"favorites" | "travels">("favorites");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setName(storedName);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const [countries, favData, travelData] = await Promise.all([
          fetchAllCountries(),
          fetchUserListWithDetails(user.id, "favorites"),
          fetchUserListWithDetails(user.id, "travels"),
        ]);

        setAllCountries(countries);
        setFavorites(favData.countries);
        setTravels(travelData.countries);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Något gick fel vid inladdning av data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  const handleRemove = async (type: "favorites" | "travels", code: string) => {
    if (!user?.id) return;
    try {
      await removeCountryFromList(user.id, type, code);
      if (type === "favorites") {
        setFavorites((prev) => prev.filter((c) => c.code !== code));
      } else {
        setTravels((prev) => prev.filter((c) => c.code !== code));
      }
    } catch (err) {
      alert("Kunde inte ta bort landet.");
      console.error(err);
    }
  };

  const handleAdd = async () => {
    if (!user?.id) return;
    try {
      await addCountryToList(user.id, selectedList, selectedCode);
      const country = allCountries.find((c) => c.code === selectedCode);
      if (!country) return;

      if (selectedList === "favorites") {
        setFavorites((prev) => prev.some((c) => c.code === selectedCode) ? prev : [...prev, country]);
      } else {
        setTravels((prev) => prev.some((c) => c.code === selectedCode) ? prev : [...prev, country]);
      }
    } catch (err) {
      alert("Kunde inte lägga till landet.");
      console.error(err);
    }
  };

  const handleMove = async (
    fromType: "favorites" | "travels",
    toType: "favorites" | "travels",
    code: string
  ) => {
    if (!user?.id) return;
    try {
      await moveCountryBetweenLists(user.id, fromType, toType, code);
      
      window.location.reload();

      const country = allCountries.find((c) => c.code === code);
      if (!country) return;

      if (fromType === "favorites") {
        setFavorites((prev) => prev.filter((c) => c.code !== code));
      } else {
        setTravels((prev) => prev.filter((c) => c.code !== code));
      }

      if (toType === "favorites") {
        setFavorites((prev) => prev.some((c) => c.code === code) ? prev : [...prev, country]);
      } else {
        setTravels((prev) => prev.some((c) => c.code === code) ? prev : [...prev, country]);
      }
    } catch (err) {
      alert("Kunde inte flytta landet.");
      console.error(err);
    }
  };

  const renderCountryList = (
    title: string,
    countries: Country[],
    listType: "favorites" | "travels"
  ) => (
    <div className="section">
      <h2 className="section-title">{title}</h2>
      {countries.length === 0 ? (
        <p className="empty-text">Inga länder tillagda ännu.</p>
      ) : (
        <ul className="country-list">
          {countries.map((country) => (
            <li key={country.code} className="country-item">
              <span className="country-info">
                {country.name}
                <div className="flag-container">
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="flag-image"
                  />
                </div>
              </span>
              <div className="button-group">
                <button onClick={() => handleRemove(listType, country.code)} className="btn-remove">
                  Ta bort
                </button>
                <button
                  onClick={() =>
                    handleMove(
                      listType,
                      listType === "favorites" ? "travels" : "favorites",
                      country.code
                    )
                  }
                  className="btn-move"
                >
                  Flytta till {listType === "favorites" ? "Reseplaner" : "Favoriter"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="profile-container">
      <h1 className="page-title">Profil</h1>
      <p className="welcome-text">Välkommen{name ? `, ${name}` : ""}!</p>

      {loading ? (
        <p className="loading-text">Laddar data...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <>
          <div className="form-section">
            <h2 className="section-title">Lägg till ett land</h2>
            <div className="form-controls">
              <select
                value={selectedCode}
                onChange={(e) => setSelectedCode(e.target.value)}
                className="select"
              >
                {allCountries.map((c) => (
                  <option key={c.code || c.name} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedList}
                onChange={(e) => setSelectedList(e.target.value as "favorites" | "travels")}
                className="select"
              >
                <option value="favorites">Favoriter</option>
                <option value="travels">Reseplaner</option>
              </select>
              <button onClick={handleAdd} className="btn-add">Lägg till</button>
            </div>
          </div>
          <div className="lists-wrapper">
            {renderCountryList("Favoriter", favorites, "favorites")}
            {renderCountryList("Reseplaner", travels, "travels")}
          </div>
        </>
      )}
    </div>
  );
};