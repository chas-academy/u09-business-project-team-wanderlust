import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = (user: User) => setUser(user);
  const logout = async() => {
    await axios.get(`${API_BASE_URL}/auth/logout`, {
      withCredentials: true
    })
    setUser(null)
  };
  interface UserResponse {
  _id: string;
  email: string;
  username: string;
}
  useEffect(() => {
  const fetchUser = async () => {
    console.log("fetchUser körs...");
    if (user) {
      console.log("Användare finns redan i state:", user);
      return;
    }
    try {
      const res = await axios.get<UserResponse>(`${API_BASE_URL}/auth/user`, {
        withCredentials: true,
      });
      console.log("Svar från backend på /auth/user:", res.data);

      if (!res.data) {
        console.log("Ingen användardata från backend");
        setUser(null);
        setIsLoading(false);
        return;
      }

      const userData = {
        id: res.data._id,
        email: res.data.email,
        name: res.data.username,
      };
      console.log("Sätter användare i state:", userData);
      setUser(userData);
    } catch (error) {
      console.error("Fel vid hämtning av användare:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser måste användas inom UserProvider");
  return context;
};
