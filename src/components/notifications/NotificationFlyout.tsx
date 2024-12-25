import React, { useRef, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Bell, Shield, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';

interface NotificationFlyoutProps {
  onClose: () => void;
}

export const NotificationFlyout: React.FC<NotificationFlyoutProps> = ({ onClose }) => {
  const { notifications, markAllAsRead, markAsRead } = useNotificationStore();
  const flyoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (flyoutRef.current && !flyoutRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-x-0 top-[64px] sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:w-96 sm:mt-2 z-50"
      ref={flyoutRef}
      role="dialog"
      aria-label="Notifications"
    >
      <Card className="mx-4 sm:mx-0 shadow-xl dark:bg-[#27272A] dark:border-gray-800">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notifications</h2>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="hover:bg-gray-100 dark:hover:bg-[#323232] transition-colors text-gray-600 dark:text-gray-200"
            >
              Mark all as read
            </Button>
          </div>
        </div>

        <div 
          className="max-h-[calc(100vh-200px)] sm:max-h-[480px] overflow-y-auto"
          role="list"
          aria-label="Notification list"
        >
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-gray-50 dark:hover:bg-[#323232] transition-colors cursor-pointer ${
                !notification.read ? 'bg-[#E5FFCA]/10 dark:bg-[#E5FFCA]/5' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
              role="listitem"
              aria-label={`${notification.title} - ${notification.read ? 'Read' : 'Unread'}`}
            >
              <div className="flex gap-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  notification.type === 'success' ? 'bg-green-100 dark:bg-[#18181B] text-green-600 dark:text-green-400' :
                  notification.type === 'warning' ? 'bg-yellow-100 dark:bg-[#18181B] text-yellow-600 dark:text-yellow-400' :
                  'bg-blue-100 dark:bg-[#18181B] text-blue-600 dark:text-blue-400'
                }`}>
                  {notification.type === 'success' && <CheckCircle className="w-4 h-4" aria-hidden="true" />}
                  {notification.type === 'warning' && <AlertTriangle className="w-4 h-4" aria-hidden="true" />}
                  {notification.type === 'info' && <Shield className="w-4 h-4" aria-hidden="true" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{notification.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{notification.description}</p>
                    </div>
                    {!notification.read && (
                      <div 
                        className="w-2 h-2 bg-[#18181B] dark:bg-[#E5FFCA] rounded-full flex-shrink-0 mt-2" 
                        aria-label="Unread notification"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    <span>{notification.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#18181B]">
          <Button 
            variant="secondary" 
            className="w-full hover:bg-gray-100 dark:hover:bg-[#323232] transition-colors text-gray-900 dark:text-gray-100"
          >
            View All Notifications
          </Button>
        </div>
      </Card>
    </div>
  );
};