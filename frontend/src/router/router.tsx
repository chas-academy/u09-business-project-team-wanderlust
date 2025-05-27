import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/homePage";
import { ProfilePage } from "../pages/profilePage";
import CompareCountriesPage from "../pages/comparePage";
import Login from "../features/auth/Login";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "profil",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      { path: "compare", element: <CompareCountriesPage /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
