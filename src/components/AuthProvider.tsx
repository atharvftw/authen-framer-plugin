import React, { createContext, useContext, useState, useEffect } from 'react';
import { framer } from 'framer-plugin';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: { email: string; password: string; name: string }) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  config?: {
    apiUrl?: string;
    storageKey?: string;
  };
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, config }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      // Use localStorage for session management
      const session = localStorage.getItem('auth_session');
      if (session) {
        const parsedSession = JSON.parse(session);
        setIsAuthenticated(true);
        setUser(parsedSession.user);
      }
    } catch (err) {
      setError('Failed to check session');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);
      
      // Store session in localStorage
      const session = {
        user: {
          email: credentials.email,
          // Add other user data as needed
        },
        token: 'dummy-token', // Replace with actual token from your auth service
      };
      
      localStorage.setItem('auth_session', JSON.stringify(session));
      setIsAuthenticated(true);
      setUser(session.user);
    } catch (err) {
      setError('Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: { email: string; password: string; name: string }) => {
    try {
      setLoading(true);
      setError(null);
      
      // Store user data in localStorage
      const session = {
        user: {
          email: userData.email,
          name: userData.name,
          // Add other user data as needed
        },
        token: 'dummy-token', // Replace with actual token from your auth service
      };
      
      localStorage.setItem('auth_session', JSON.stringify(session));
      setIsAuthenticated(true);
      setUser(session.user);
    } catch (err) {
      setError('Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      localStorage.removeItem('auth_session');
      setIsAuthenticated(false);
      setUser(null);
    } catch (err) {
      setError('Logout failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        register,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 