/* import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode }from "jwt-decode";
import { useUser } from "./UserContext";
import type { User } from "./UserContext";
import { useNavigate } from "react-router-dom"; */

import { useEffect, useState } from "react";


const Login = () => {
  // const { login } = useUser();
  // const navigate = useNavigate();
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

  const logout = async () => {
    await fetch("http://localhost:3000/auth/logout", {
      credentials: "include"
    });
    setUser(null);
    window.location.href = "/";
  };

  return (
    <div className="login">
      <h1>Logga in med Google</h1>
      {user ? (
        <div>
          <p>Welcome, {user.username}</p>
          {/*<img src={user.photos[0].value} alt="profile picture" width="100"/>*/}
          <br />
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={signIn}>Login with Google</button>
      )}
    </div>
  )

/*   return (
    <div className="login">
      <h1>Logga in</h1>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const token = credentialResponse.credential;
          if (token) {
            const user = jwtDecode<User>(token);
            //Spara användarnamn i localStorage
            localStorage.setItem('userName', user.name);

            // Anropa context i login
            login({
              name: user.name,
              email: user.email,
              picture: user.picture,
            });

            // Sedan navigeras man till profilsidan
            navigate("/profil");
          }
        }}
        onError={() => {
          console.log("Misslyckades att logga in");
        }}
      />
    </div>
  ); */
};

export default Login;
