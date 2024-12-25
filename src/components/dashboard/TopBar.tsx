import React from 'react';
import { Bell, User, ChevronRight, Menu } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useNotificationStore } from '../../store/notificationStore';
import { SearchBar } from './SearchBar';
import { NotificationFlyout } from '../notifications/NotificationFlyout';
import { UserMenu } from './UserMenu';

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const { showFlyout, setShowFlyout, unreadCount } = useNotificationStore();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="h-16 px-4 flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-5 h-5 text-gray-500" />
        </button>

        <div className="flex-1 flex items-center gap-4">
          <div className="hidden sm:block flex-1 max-w-xl">
            <SearchBar />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <button 
              className="p-2 text-gray-500 hover:text-gray-900 relative"
              onClick={() => setShowFlyout(!showFlyout)}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#18181B] rounded-full" />
              )}
            </button>
            {showFlyout && <NotificationFlyout onClose={() => setShowFlyout(false)} />}
          </div>
          
          <UserMenu />
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="sm:hidden px-4 pb-3">
        <SearchBar />
      </div>
    </header>
  );
};