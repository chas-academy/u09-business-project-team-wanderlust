import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const Login = () => {
  const [ user, setUser ] = useState<any>(null);

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
    
<div className="flex items-center justify-center min-h-screen bg-gray-700">
  <div
    style={{
      backgroundColor: '#f3f4f6',

      width: '100%',
      //height: '200px',
      padding: '1rem',
      borderRadius: '0.5rem',
      border: '1px solidrgb(5, 5, 5)', // Tailwind border-gray-600
      textAlign: 'center',
    }}
  >
    <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>
      Logga in
    </h1>

    <button
      style={{
        backgroundColor: '#3b82f6 ',
        color: 'white',
        padding: '0.5rem 1.5rem',
        borderRadius: '0.375rem',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
        onClick={signIn}
      >
        Login with Google
      </button>
            {/* Visa om användaren är inloggad */}
    {user ? (
      <p>Inloggad som: {user.username || user.email}</p>
    ) : (
      <p>Inte inloggad</p>
    )}
    
    </div>
    </div>
    
  )
};

export default Login;
