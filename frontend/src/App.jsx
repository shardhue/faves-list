import { Route, Routes } from 'react-router-dom'
import Navbar from './components/NavBar'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import './index.css'

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </>
  )
}

export default App
