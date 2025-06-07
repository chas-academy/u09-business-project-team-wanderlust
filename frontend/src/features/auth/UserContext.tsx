import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";


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
    await axios.get("http://localhost:3000/auth/logout", {
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
    const fetchUser = async() => {
      if (user) return; 
      const res = await axios.get<UserResponse>(`http://localhost:3000/auth/user`, {
        withCredentials: true
      });

      if (!res.data) {
        setUser(null)
        setIsLoading(false)
        return;
      }
    const userData = {
      id: res.data._id,
      email: res.data.email,
      name: res.data.username,
    }
    setUser(userData)
    setIsLoading(false)
    }
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
