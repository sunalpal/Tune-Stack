import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';

export default function Register() {
  const navigate = useNavigate();

  // state to store user input
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    userType: 'user',
    password: '',
  });

  // handle input changes for all fields
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  // handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        email: formData.email,
        fullname: {
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
        username: formData.username,
        password: formData.password,
        role: formData.userType,
      },{withCredentials: true});

      console.log('Registration successful:', response.data);
      alert('Registration successful!');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  }

  // toggle user type (optional helper)
  function handleUserTypeChange(type) {
    setFormData(prev => ({ ...prev, userType: type }));
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <header className="register-header">
          <h1>Create your account</h1>
          <p className="muted">Start your free account — no payment required.</p>
        </header>

        <button onClick={()=>{
          window.location.href='http://localhost:3000/api/auth/google'
        }}
         type="button" className="google-btn" aria-label="Continue with Google">
          <svg className="google-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
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

          <div style={{ display: 'flex', gap: '10px' }}>
            <label style={{ flex: 1 }}>
              <span className="label">First name</span>
              <input
                type="text"
                name="firstName"
                placeholder="Jane"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </label>

            <label style={{ flex: 1 }}>
              <span className="label">Last name</span>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label>
            <span className="label">Username</span>
            <input
              type="text"
              name="username"
              placeholder="fullname.lastname (e.g. jane.doe)"
              value={formData.username}
              onChange={handleChange}
            />
          </label>

          <fieldset className="radio-group" aria-label="Account type">
            <legend className="label">Account type</legend>
            <div className="radio-row">
              <label className="radio-option">
                <input
                  type="radio"
                  name="userType"
                  value="user"
                  checked={formData.userType === 'user'}
                  onChange={() => handleUserTypeChange('user')}
                />
                <span>User</span>
              </label>

              <label className="radio-option">
                <input
                  type="radio"
                  name="userType"
                  value="artist"
                  checked={formData.userType === 'artist'}
                  onChange={() => handleUserTypeChange('artist')}
                />
                <span>Artist</span>
              </label>
            </div>
          </fieldset>

          <label>
            <span className="label">Password</span>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <button className="primary" type="submit">Continue</button>
        </form>

        <p className="sign-in-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
