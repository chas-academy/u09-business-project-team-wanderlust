import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
    return (
        <div className={`login`}>
            <h1>Logga in</h1>
            <GoogleLogin
            onSuccess={(CredentialResponse) => {
                console.log("lyckades:", CredentialResponse);
            }}
            onError={() => {
                console.log("misslyckades att logga in");
            }}
            />
            </div>
    );
};

export default Login;