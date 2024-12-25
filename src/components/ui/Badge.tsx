import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  type: 'FREE' | 'PRO' | 'TEAM';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, className }) => {
  const variants = {
    FREE: 'bg-badge-free dark:bg-badge-free-dark text-gray-500',
    PRO: 'bg-badge-pro dark:bg-badge-pro-dark text-gray-700',
    TEAM: 'bg-badge-team dark:bg-badge-team-dark text-indigo-700',
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