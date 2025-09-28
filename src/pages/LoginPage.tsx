import React from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { APP_NAME, APP_DESCRIPTION } from '@/config/env';

const LoginPage: React.FC = () => {
  const { isAuthenticated, loading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/';

  const handleLogin = async (provider: 'google' | 'apple') => {
    await login(provider);
    navigate(from, { replace: true });
  };

  if (isAuthenticated && !loading) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="text-center space-y-4">
          <img src="/logo.png" alt="App Logo" className="w-20 h-20 mx-auto rounded-2xl shadow-lg" />
          <h1 className="text-4xl font-bold text-foreground mt-8">
            Secure access to {APP_NAME}
          </h1>
          <p className="text-muted-foreground">
            {APP_DESCRIPTION}
          </p>
        </div>

        <div className="space-y-4 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <Button
            className="w-full py-6 text-base bg-white text-black hover:bg-neutral-100 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 border shadow-sm"
            onClick={() => handleLogin('google')}
            disabled={loading}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </Button>

          <Button
            className="w-full py-6 text-base bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 border shadow-sm"
            onClick={() => handleLogin('apple')}
            disabled={loading}
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 7c-3 0-4 3-4 5.5 0 3 2 7.5 5 7.5 1.5 0 2.5-.5 3.5-1.5.5.5 1 1 1 1 .5 0 1-1 1-1 .5.5 1 .5 1.5.5 1 0 2-1 2-1-2 0-3-6-3-6 0-1 0-2-1-2h-4C10 10 9 9 9 7Z" />
              <path d="M9 7V6c0-1.5.5-3 2.5-3s2.5 1.5 2.5 3v1" />
            </svg>
            Continue with Apple
          </Button>
        </div>

        <div className="relative animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
