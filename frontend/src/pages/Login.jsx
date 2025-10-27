import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'
import axios from 'axios'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/login',
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true, // allows cookies to be stored
        }
      )

      console.log('Login successful:', response.data)
      navigate('/') // redirect after successful login
    } catch (error) {
      console.log('Login failed:', error)
  
  }
  }
  return (
    <div className="register-page">
      <div className="register-card">
        <header className="register-header">
          <h1>Welcome back</h1>
          <p className="muted">Sign in to your account</p>
        </header>

        <button  onClick={()=>{
          window.location.href='http://localhost:3000/api/auth/google'
        }}
        type="button" className="google-btn" aria-label="Continue with Google">
          <svg className="google-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path
              d="M21.35 11.1h-9.2v2.9h5.3c-.25 1.35-1.35 3.95-5.3 3.95-3.2 0-5.8-2.65-5.8-5.9s2.6-5.9 5.8-5.9c1.8 0 3 0.78 3.7 1.45l2.5-2.4C17.85 3.55 15.8 2.4 12.9 2.4 7.9 2.4 3.9 6.35 3.9 11.4s4 9 9 9c5.2 0 8.65-3.6 8.65-8.7 0-.6-.05-1.05-.1-1.6z"
              fill="#4285F4"
            />
          </svg>
          Continue with Google
        </button>

        <div className="divider"><span>or</span></div>

        <form className="register-form" onSubmit={handleSubmit}>
          <label>
            <span className="label">Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <span className="label">Password</span>
            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <button className="primary" type="submit">
            Continue
          </button>
        </form>

        <p className="sign-in-link">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  )
}
