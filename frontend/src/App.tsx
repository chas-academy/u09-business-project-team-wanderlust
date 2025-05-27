import { Header } from './components/header'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* 👈 Här visas alla child-routes */}
      </main>
    </>
  )
}

export default App