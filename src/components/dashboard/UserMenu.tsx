import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, User } from 'lucide-react';
import { cn } from '../../lib/utils';

export const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Implement logout functionality
    console.log('Logging out...');
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 p-2 rounded-lg transition-colors",
          "hover:bg-gray-100 dark:hover:bg-[#323232]"
        )}
      >
        <div className="w-8 h-8 rounded-full bg-[#E5FFCA] flex items-center justify-center">
          <span className="text-sm font-medium text-[#18181B]">JD</span>
        </div>
      </button>

      {isOpen && (
        <div className={cn(
          "absolute right-0 mt-2 w-56 rounded-lg overflow-hidden z-50",
          "bg-white dark:bg-[#27272A] border border-gray-200 dark:border-transparent",
          "shadow-lg"
        )}>
          <div className="p-2">
            <div className="px-2 py-3 border-b border-gray-100 dark:border-gray-800">
              <p className="font-medium text-gray-900 dark:text-white">John Doe</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">john@company.com</p>
            </div>

            <div className="py-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/settings/profile');
                }}
                className={cn(
                  "w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-colors",
                  "text-gray-600 dark:text-gray-200",
                  "hover:bg-gray-50 dark:hover:bg-[#323232]",
                  "hover:text-gray-900 dark:hover:text-white"
                )}
              >
                <User className="w-4 h-4" />
                <span>Profile Settings</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/settings');
                }}
                className={cn(
                  "w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-colors",
                  "text-gray-600 dark:text-gray-200",
                  "hover:bg-gray-50 dark:hover:bg-[#323232]",
                  "hover:text-gray-900 dark:hover:text-white"
                )}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className={cn(
                  "w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-colors",
                  "text-gray-600 dark:text-gray-200",
                  "hover:bg-gray-50 dark:hover:bg-[#323232]",
                  "hover:text-gray-900 dark:hover:text-white"
                )}
              >
                <LogOut className="w-4 h-4" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};