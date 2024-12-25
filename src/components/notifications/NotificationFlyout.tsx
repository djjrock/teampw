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
    >
      <Card className="mx-4 sm:mx-0 shadow-xl">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          </div>
        </div>

        <div className="max-h-[calc(100vh-200px)] sm:max-h-[480px] overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-gray-50 transition-colors ${
                !notification.read ? 'bg-[#E5FFCA]/10' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex gap-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  notification.type === 'success' ? 'bg-green-100' :
                  notification.type === 'warning' ? 'bg-yellow-100' :
                  'bg-blue-100'
                }`}>
                  {notification.type === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                  {notification.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                  {notification.type === 'info' && <Shield className="w-4 h-4 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-gray-900">{notification.title}</h3>
                      <p className="text-sm text-gray-500">{notification.description}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-[#18181B] rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{notification.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <Button variant="secondary" className="w-full">
            View All Notifications
          </Button>
        </div>
      </Card>
    </div>
  );
};