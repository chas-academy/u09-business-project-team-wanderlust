import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
// import { Provider } from 'react-redux'
// import { store } from './store' // använder inte redux

import HomePage from './pages/homePage'
import{ ProfilPage }from './pages/profilPage'
import CompareCountriesPage from './pages/comparePage'
import Login from './features/auth/Login'
import { UserProvider } from "./features/auth/UserContext"

import App from './App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>error app</h1>,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'profil', element: <ProfilPage /> },
      { path: 'compare', element: <CompareCountriesPage /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <h1>error login</h1>,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <RouterProvider router={router} />
      </UserProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);

/* med redux
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
) */