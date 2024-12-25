import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = cn(
    'inline-flex items-center justify-center rounded-full font-medium transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-[#E5FFCA]/10',
    'disabled:opacity-50 disabled:pointer-events-none'
  );
  
  const variants = {
    primary: cn(
      'bg-[#18181B] hover:bg-[#27272A] text-white',
      'dark:bg-[#E5FFCA] dark:hover:bg-[#E5FFCA]/90 dark:text-[#18181B]'
    ),
    secondary: cn(
      'bg-white border border-gray-200 hover:bg-gray-50 text-gray-900',
      'dark:bg-[#27272A] dark:border-transparent dark:hover:bg-[#323232] dark:text-white'
    ),
    ghost: cn(
      'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
      'dark:text-gray-200 dark:hover:bg-[#323232] dark:hover:text-white'
    ),
    destructive: cn(
      'text-red-600 hover:bg-red-50',
      'dark:text-red-500 dark:hover:bg-red-900/10'
    ),
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};