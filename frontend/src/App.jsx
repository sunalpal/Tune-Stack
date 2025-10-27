
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'

function Home() {

  return (
    <>
  
      <nav >
        <Link to="/">Home</Link> | <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
      </nav>

<h1>This is Home page </h1>
  
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
