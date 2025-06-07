import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const Login = () => {
  const [ setUser ] = useState<any>(null);

  const fetchUser = async () => {
    const res = await fetch(`${API_BASE_URL}/auth/user`, {
      credentials: "include"
    });

    const data = await res.json();
    setUser(data);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const signIn = () => {
    window.open(`${API_BASE_URL}/auth/google`, "_self")
  }

  return (
    <div className="login">
      <h1>Logga in</h1>
        <button onClick={signIn}>Login with Google</button>
    </div>
  )
};

export default Login;
