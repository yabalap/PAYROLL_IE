import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const userContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/auth/verify', {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });

          if (response.data.success && response.data.user) {
            setUser(response.data.user); // Set the user if the token is valid
          } else {
            setUser(null); // If no user or invalid token
          }
        } else {
          setUser(null); // No token means no user
        }
      } catch (error) {
        console.error('Error verifying user:', error);
        setUser(null); // If any error occurs, reset user state
      } finally {
        setLoading(false); // Ensure loading state is set to false
      }
    };

    verifyUser();
  }, []);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => useContext(userContext);

export default AuthContext;
