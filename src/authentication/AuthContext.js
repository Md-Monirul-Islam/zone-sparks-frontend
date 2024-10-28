import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Auth Context
const AuthContext = createContext();

// Custom hook for easy access to AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in when the app loads
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user); // Set based on user data presence in local storage
  }, []);

  // Function to handle login
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
