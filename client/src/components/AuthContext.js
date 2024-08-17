import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context to hold authentication-related data
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user data from local storage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to log in the user and store their data in local storage
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Function to log out the user and clear their data from local storage
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Provide the user, login, and logout functions to any children components
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access authentication context
export function useAuth() {
  return useContext(AuthContext);
}
