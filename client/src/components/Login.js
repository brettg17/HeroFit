import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';
import { useAuth } from './AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password,
      });
      login(response.data);
      navigate('/classes');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Log In</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <i className="fas fa-user input-icon"></i>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <i className="fas fa-lock input-icon"></i>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
          </div>
          <button type="submit" className="login-button">LOG IN</button>
        </form>
        <div className="signup-link">
          No account? <a href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
