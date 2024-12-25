import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Key, Users, Settings, Shield, LogOut, Bell } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useNotificationStore } from '../../store/notificationStore';
import { useAuthStore } from '../../store/authStore';
import { Toggle } from '../ui/Toggle';
import { useThemeStore } from '../../store/themeStore';

interface SidebarProps {
  onClose?: () => void;
}

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Key, label: 'Passwords', path: '/' },
  { icon: Users, label: 'Teams', path: '/teams' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { unreadCount, setShowFlyout } = useNotificationStore();
  const { signOut } = useAuthStore();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <aside className="w-[250px] bg-white dark:bg-[#18181B] border-r border-gray-100 dark:border-gray-800 h-screen flex flex-col">
      <div className="flex-1 px-3 py-4">
        <div className="flex items-center gap-2 px-3 py-2 mb-6">
          <div className="w-8 h-8 bg-[#E5FFCA] rounded-full flex items-center justify-center">
            <Shield className="w-4 h-4 text-gray-900 dark:text-gray-800" />
          </div>
          <span className="text-base font-medium text-gray-900 dark:text-gray-100">TeamPW</span>
          <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-medium px-2 py-0.5 rounded-full">
            FREE
          </span>
        </div>
        
        <nav className="space-y-1">
          <button
            onClick={() => setShowFlyout(true)}
            className={cn(
              'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
              'text-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#27272A] hover:text-gray-900 dark:hover:text-gray-100'
            )}
          >
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </div>
            {unreadCount > 0 && (
              <span className="bg-[#E5FFCA] text-xs font-medium px-2 py-0.5 rounded-full text-[#18181B]">
                {unreadCount}
              </span>
            )}
          </button>

          {navItems.map(({ icon: Icon, label, path }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive
                    ? 'bg-gray-100 dark:bg-[#27272A] text-gray-900 dark:text-gray-100 font-medium'
                    : 'text-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#27272A] hover:text-gray-900 dark:hover:text-gray-100'
                )
              }
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </div>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="px-3 pb-4">
        <div className="px-3 py-2 mb-3">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
            <span>Monthly Invoices</span>
            <span>14 out of 16</span>
          </div>
          <div className="h-1.5 bg-[#F4F4F5] dark:bg-gray-700 rounded-full">
            <div 
              className="h-full bg-[#18181B] dark:bg-gray-100 rounded-full" 
              style={{width: '87.5%'}}
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Low on invoices. <span className="text-gray-900 dark:text-gray-100 font-medium cursor-pointer">Upgrade →</span>
          </p>
        </div>

        <div className="mb-3 px-3 py-2 flex items-center justify-between rounded-lg transition-colors bg-gray-50 dark:bg-[#27272A]">
          <span className="text-sm text-gray-600 dark:text-gray-200">Dark Mode</span>
          <Toggle checked={isDark} onChange={toggleTheme} />
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#27272A] rounded-lg"
        >
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};