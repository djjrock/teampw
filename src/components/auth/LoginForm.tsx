import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Shield, Mail, Moon, Sun } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();
  const signIn = useAuthStore((state) => state.signIn);
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    
    // Sign in and navigate to dashboard
    setTimeout(async () => {
      try {
        await signIn(email);
        navigate('/dashboard', { replace: true });
      } catch (error) {
        console.error('Sign in error:', error);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#18181B] py-12 px-4 sm:px-6 lg:px-8">
      <button
        onClick={toggleTheme}
        className={cn(
          "fixed top-4 right-4 p-2 rounded-lg transition-colors",
          "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white",
          "hover:bg-gray-100 dark:hover:bg-[#27272A]"
        )}
        aria-label="Toggle dark mode"
      >
        {isDark ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>

      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-[#E5FFCA] rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-[#18181B]" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Sign in with your email to continue
          </p>
        </div>

        <Card className={cn(
          "p-8",
          "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent"
        )}>
          {!isSent ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="example@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3 py-2 border rounded-lg transition-colors bg-white dark:bg-[#27272A] border-gray-200 dark:border-[#3f3f46] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10 focus:border-transparent dark:focus:border-transparent"
                  />
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  We'll send you a magic link to sign in
                </p>
              </div>

              <Button className="w-full">
                Send Magic Link
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-[#E5FFCA]/20 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6 text-[#E5FFCA]" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Check your email
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We've sent a magic link to <strong>{email}</strong>
              </p>
            </div>
          )}
        </Card>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          By continuing, you agree to our{' '}
          <a href="#" className="text-[#18181B] dark:text-[#E5FFCA] hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-[#18181B] dark:text-[#E5FFCA] hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}