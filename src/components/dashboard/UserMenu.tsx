import React, { useState, useRef, useEffect } from 'react';
import { User, ChevronRight, Settings } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

export const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const user = useAuthStore((state) => state.user);
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

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-gray-600" />
        </div>
        <div className="hidden sm:block">
          <span className="text-sm font-medium text-gray-900">
            {user?.email || 'Guest'}
          </span>
          <span className="ml-2 bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
            FREE
          </span>
        </div>
        <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          <div className="sm:hidden px-4 py-2 border-b border-gray-100">
            <div className="text-sm font-medium text-gray-900">{user?.email || 'Guest'}</div>
            <div className="text-xs text-gray-500 mt-0.5">Free Plan</div>
          </div>
          
          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/settings/profile');
              }}
              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left flex items-center"
            >
              <Settings className="w-4 h-4 mr-2" />
              Profile Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};