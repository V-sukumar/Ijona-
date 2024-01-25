import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    try {
      const response = await axios.post('https://ijona-backend.onrender.com/user/login', userData);
      setUser(response.user.user); 
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const logout = () => {
    setUser(null);
    // localStorage.removeItem('userToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
