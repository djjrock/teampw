import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-xl border shadow-sm transition-colors",
        "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};