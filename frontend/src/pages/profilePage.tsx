import { useEffect, useState } from "react";
import { useUser } from "../features/auth/UserContext";
import { fetchUserListWithDetails } from "../api/listApi";

export const ProfilePage = () => {
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    const storedName = localStorage.getItem('userName')
    if (storedName) {
      setName(storedName)
    }
  }, [])
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Profil</h1>
      {name ? (
        <p className="mt-2 text-lg">Välkommen, {name}!</p>
      ) : (
        <p className="mt-2 text-lg">Välkommen!</p>
      )}
    </div>
  )

  /* const { user } = useUser();
  const [] */
}


// export default profilePage;