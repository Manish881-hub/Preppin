import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Navigate, useLocation } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  username?: string;
  subscription?: 'free' | 'premium';
  walletBalance?: number;
  interests?: string[];
  followedCompanies?: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (provider: 'google' | 'apple') => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for development
const MOCK_USER: User = {
  id: 'user-123',
  name: 'Your Name',
  email: 'your.email@example.com',
  avatar: '/default-avatar.png',
  username: 'yourusername',
  subscription: 'free',
  walletBalance: 0,
  interests: ['Tech', 'Product Management', 'Software Engineering'],
  followedCompanies: ['Google', 'Apple', 'Microsoft'],
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would check with your backend/auth provider
        // For now, we'll just use localStorage to simulate persistence
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          // Auto-login for development
          // Remove this in production
          setUser(MOCK_USER);
          localStorage.setItem('user', JSON.stringify(MOCK_USER));
        }
      } catch (err) {
        setError('Authentication check failed');
        console.error(err);
      } finally {
        // Simulate network delay
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    checkAuth();
  }, []);

  const login = async (provider: 'google' | 'apple') => {
    setLoading(true);
    try {
      // In a real app, you would authenticate with the provider
      // For now, we'll just simulate a successful login

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setUser(MOCK_USER);
      localStorage.setItem('user', JSON.stringify(MOCK_USER));

      toast({
        title: 'Login successful',
        description: `Welcome back, ${MOCK_USER.name}!`,
      });
    } catch (err) {
      setError('Login failed');
      toast({
        title: 'Login failed',
        description: 'Please try again later.',
        variant: 'destructive',
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      // In a real app, you would sign out with your auth provider
      // For now, we'll just clear the local user

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setUser(null);
      localStorage.removeItem('user');

      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
      });
    } catch (err) {
      setError('Logout failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!user,
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

// Protected route component
export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};