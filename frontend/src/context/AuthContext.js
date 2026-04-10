import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import API from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      setUser(null);
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(`${API}/api/auth/login`, {
      email,
      password,
    });

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    setUser(res.data.user);

    window.location.href = "/";
  };

  const signup = async (name, email, password) => {
    const res = await axios.post(`${API}/api/auth/signup`, {
      name,
      email,
      password,
    });

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    setUser(res.data.user);

    window.location.href = "/";
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);

    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};