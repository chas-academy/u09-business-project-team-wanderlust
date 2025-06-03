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
        console.log("Använder userId i fetch:", user?.id);
        const [countries, favData, travelData] = await Promise.all([
          fetchAllCountries(),
          fetchUserListWithDetails(user.id, "favorites"),
          fetchUserListWithDetails(user.id, "travels"),
        ]);

        console.log("fetchAllCountries() result:", countries);

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
      const updated = await fetchUserListWithDetails(user.id, selectedList);
      if (selectedList === "favorites") setFavorites(updated.countries);
      else setTravels(updated.countries);
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
    const result = await moveCountryBetweenLists(user.id, fromType, toType, code);
    console.log("Flytt-resultat:", result);

    // Ta bort landet från "from"-listan
    if (fromType === "favorites") {
      setFavorites((prev) => prev.filter((c) => c.code !== code));
    } else {
      setTravels((prev) => prev.filter((c) => c.code !== code));
    }

    // Lägg till landet i "to"-listan (om det inte redan finns)
    if (toType === "favorites") {
      setFavorites((prev) =>
        prev.some((c) => c.code === code)
          ? prev
          : [...prev, allCountries.find((c) => c.code === code)!]
      );
    } else {
      setTravels((prev) =>
        prev.some((c) => c.code === code)
          ? prev
          : [...prev, allCountries.find((c) => c.code === code)!]
      );
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
  <div className="mt-6">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    {countries.length === 0 ? (
      <p className="text-gray-500">Inga länder tillagda ännu.</p>
    ) : (
      <ul className="list-disc list-inside">
        {countries.map((country) => (
          <li
            key={country.code}
            className="flex items-center justify-between gap-4 min-w-0"
          >
            <span className="flex items-center gap-2 min-w-0">
              {country.name}
              <div
                className="w-8 h-5 bg-gray-200 inline-flex items-center justify-center rounded-sm overflow-hidden flex-shrink-0"
                style={{ aspectRatio: "4 / 3" }}
              >
                <img
                  src={country.flag}
                  alt={country.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </span>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => handleRemove(listType, country.code)}
                className="text-red-500 hover:text-red-700"
              >
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
                className="text-blue-500 hover:text-blue-700"
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
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Profil</h1>
      <p className="mt-2 text-lg">Välkommen{name ? `, ${name}` : ""}!</p>

      {loading ? (
        <p className="mt-4">Laddar data...</p>
      ) : error ? (
        <p className="mt-4 text-red-500">{error}</p>
      ) : (
        <>
          {/* Formulär */}
          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-semibold mb-2">Lägg till ett land</h2>
            <div className="flex gap-4 items-center flex-wrap">
              <select
                value={selectedCode}
                onChange={(e) => setSelectedCode(e.target.value)}
                className="border p-2"
              >
                {allCountries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
              <select
                value={selectedList}
                onChange={(e) => setSelectedList(e.target.value as "favorites" | "travels")}
                className="border p-2"
              >
                <option value="favorites">Favoriter</option>
                <option value="travels">Reseplaner</option>
              </select>
              <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
                Lägg till
              </button>
            </div>
          </div>

          {/* Listor */}
          {renderCountryList("Favoriter", favorites, "favorites")}
          {renderCountryList("Reseplaner", travels, "travels")}
        </>
      )}
    </div>
  );
};