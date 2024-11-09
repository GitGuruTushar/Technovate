import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Email and password are required');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v4/users/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        // Store the token in localStorage or use context to manage authentication state
        localStorage.setItem('token', response.data.token);
        setMessage('Login successful');
        navigate('/survey'); // Redirect to dashboard or home page
      }
    } catch (error) {
      console.error(error);
      setMessage('Invalid email or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Login;
