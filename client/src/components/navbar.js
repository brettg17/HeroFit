import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { useAuth } from '../components/AuthContext';
import DropdownMenu from './DropdownMenu';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="nav">
      <Link to="/" className="HeroFit">HeroFit</Link>
      <ul>
        {user ? (
          <DropdownMenu />
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
