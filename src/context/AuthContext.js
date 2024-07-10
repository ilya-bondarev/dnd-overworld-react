import React, { createContext, useState, useEffect } from 'react';
import { register, login, logout } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
  }, []);

  const handleRegister = async (userData) => {
    try {
      const data = await register(userData);
      localStorage.setItem('token', data.token);
      setUser({ token: data.token });
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const handleLogin = async (userData) => {
    try {
      const data = await login(userData);
      localStorage.setItem('token', data.token);
      setUser({ token: data.token });
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleRegister, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;