import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      try { setUser(JSON.parse(savedUser)); }
      catch { localStorage.removeItem('token'); localStorage.removeItem('user'); }
    }
    setLoading(false);
  }, []);

  const saveAuth = useCallback((userData) => {
    const { token, ...profile } = userData;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(profile));
    setUser(profile);
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    saveAuth(data);
    return data;
  }, [saveAuth]);

  const register = useCallback(async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    saveAuth(data);
    return data;
  }, [saveAuth]);

  const googleLogin = useCallback(async (googleData) => {
    const { data } = await api.post('/auth/google', googleData);
    saveAuth(data);
    return data;
  }, [saveAuth]);

  const guestLogin = useCallback(async () => {
    const { data } = await api.post('/auth/guest');
    saveAuth(data);
    return data;
  }, [saveAuth]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await api.get('/auth/me');
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch { logout(); }
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, guestLogin, logout, updateUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
