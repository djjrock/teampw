import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  type: 'FREE' | 'PRO' | 'TEAM';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, className }) => {
  const variants = {
    FREE: cn(
      'bg-gray-100 text-gray-600',
      'dark:bg-[#0a0a0a] dark:text-gray-400'
    ),
    PRO: cn(
      'bg-[#E5FFCA] text-[#18181B]',
      'dark:bg-[#E5FFCA] dark:text-[#18181B]'
    ),
    TEAM: cn(
      'bg-[#E5FFCA] text-[#18181B]',
      'dark:bg-[#E5FFCA] dark:text-[#18181B]'
    ),
  };

  return (
    <span className={cn(
      'px-2 py-0.5 text-xs font-medium rounded-full',
      variants[type],
      className
    )}>
      {type}
    </span>
  );
};