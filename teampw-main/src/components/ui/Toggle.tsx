import React from 'react';
import { cn } from '../../lib/utils';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, className }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-state={checked ? 'checked' : 'unchecked'}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-[#E5FFCA]/10',
        checked 
          ? 'bg-[#18181B] dark:bg-[#E5FFCA]' 
          : 'bg-gray-200 dark:bg-[#323232]',
        className
      )}
    >
      <span
        className={cn(
          'absolute inline-block h-4 w-4 transform rounded-full transition-transform',
          'bg-white dark:bg-[#18181B]',
          'shadow-sm',
          checked ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </button>
  );
};