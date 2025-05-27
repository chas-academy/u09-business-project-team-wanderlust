import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode }from "jwt-decode";
import { useUser } from "./UserContext";
import type { User } from "./UserContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  return (
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
  );
};

export default Login;
