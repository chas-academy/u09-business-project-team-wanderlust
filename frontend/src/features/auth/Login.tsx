import { useEffect, useState } from "react";


const Login = () => {
  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    const res = await fetch("http://localhost:3000/auth/user", {
      credentials: "include"
    });

    const data = await res.json();
    setUser(data);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const signIn = () => {
    window.open("http://localhost:3000/auth/google", "_self")
  }

  return (
    <div className="login">
      <h1>Logga in</h1>
        <button onClick={signIn}>Login with Google</button>
    </div>
  )
};

export default Login;
