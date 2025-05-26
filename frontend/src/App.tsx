import HomePage from "./pages/homePage";
import { Header } from "./components/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfilPage } from './pages/profilPage'
import CompareCountriesPage from './pages/comparePage'

// import comparePage from "./pages/comparePage";

/*
const App = () => {
  return <HomePage />;
};
*/

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profil" element={<ProfilPage />} />
        <Route path="/compare" element={<CompareCountriesPage />} />
        </Routes>
        </BrowserRouter>
  )
}

export default App;