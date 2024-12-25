import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Toggle } from '../ui/Toggle';
import { 
  ChevronLeft, Shield, Smartphone, Key, History, 
  AlertCircle, Lock, LogOut 
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const SecuritySettings: React.FC = () => {
  const navigate = useNavigate();
  const [twoFactor, setTwoFactor] = React.useState(true);
  const [sessionTimeout, setSessionTimeout] = React.useState(true);
  const [passwordRotation, setPasswordRotation] = React.useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/settings')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-[#323232] rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-500 dark:text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Security Settings</h1>
      </div>

      <div className="space-y-6">
        <Card className={cn(
          "divide-y dark:divide-[#323232]",
          "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent"
        )}>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#E5FFCA] rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#18181B]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                </div>
              </div>
              <Toggle checked={twoFactor} onChange={setTwoFactor} />
            </div>
            {twoFactor && (
              <div className="mt-4 flex items-center gap-4">
                <Button 
                  variant="secondary" 
                  className={cn(
                    "flex-1",
                    "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent",
                    "hover:bg-gray-50 dark:hover:bg-[#323232] text-gray-900 dark:text-white"
                  )}
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Set up authenticator app
                </Button>
                <Button 
                  variant="secondary" 
                  className={cn(
                    "flex-1",
                    "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent",
                    "hover:bg-gray-50 dark:hover:bg-[#323232] text-gray-900 dark:text-white"
                  )}
                >
                  <Key className="w-4 h-4 mr-2" />
                  View backup codes
                </Button>
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-[#0a0a0a] rounded-lg flex items-center justify-center">
                  <History className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Session Timeout</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Automatically log out after period of inactivity</p>
                </div>
              </div>
              <Toggle checked={sessionTimeout} onChange={setSessionTimeout} />
            </div>
            {sessionTimeout && (
              <div className="mt-4">
                <select className={cn(
                  "w-full px-3 py-2 border rounded-lg transition-colors appearance-none",
                  "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                  "text-gray-900 dark:text-white",
                  "focus:ring-2 focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10"
                )}>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-[#0a0a0a] rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Password Rotation</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Require password change every 90 days</p>
                </div>
              </div>
              <Toggle checked={passwordRotation} onChange={setPasswordRotation} />
            </div>
          </div>
        </Card>

        <Card className={cn(
          "p-6",
          "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent"
        )}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-red-50 dark:bg-[#0a0a0a] rounded-lg flex items-center justify-center">
              <LogOut className="w-5 h-5 text-red-600 dark:text-red-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Active Sessions</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Manage your active sessions across devices</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { device: 'MacBook Pro', location: 'San Francisco, CA', lastActive: 'Current session' },
              { device: 'iPhone 12', location: 'San Francisco, CA', lastActive: '2 hours ago' },
              { device: 'Windows PC', location: 'New York, NY', lastActive: '2 days ago' }
            ].map((session, i) => (
              <div key={i} className={cn(
                "flex items-center justify-between p-4 rounded-lg",
                "bg-gray-50 dark:bg-[#0a0a0a]"
              )}>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{session.device}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{session.location} · {session.lastActive}</p>
                </div>
                {session.lastActive !== 'Current session' && (
                  <Button 
                    variant="ghost" 
                    className="text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
                  >
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className={cn(
          "p-6",
          "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent"
        )}>
          <div className="flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Security Recommendations</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Enable two-factor authentication and use a strong, unique password to better protect your account.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};