import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        const isSuperuser = localStorage.getItem('is_superuser') === 'true'; // Get superuser status from local storage
        setIsLoggedIn(!!token); // Update login status based on token
        return isSuperuser; // Return superuser status
    };

    const logout = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('user_id');
      localStorage.removeItem('token');
      localStorage.removeItem('is_superuser');
      setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
