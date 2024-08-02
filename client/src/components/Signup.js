import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Signup.css';
import { useAuth } from './AuthContext';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }
    try {
      const response = await axios.post('http://localhost:5001/api/auth/signup', {
        username,
        email,
        password,
      });
      login(response.data);
      navigate('/classes');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              <i className="fas fa-user input-icon"></i> Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <i className="fas fa-envelope input-icon"></i> Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <i className="fas fa-lock input-icon"></i> Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
