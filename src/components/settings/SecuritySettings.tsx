import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Toggle } from '../ui/Toggle';
import { 
  ChevronLeft, Shield, Smartphone, Key, History, 
  AlertCircle, Lock, LogOut 
} from 'lucide-react';

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
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>
      </div>

      <div className="space-y-6">
        <Card className="divide-y divide-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#E5FFCA] rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#18181B]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h2>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
              </div>
              <Toggle checked={twoFactor} onChange={setTwoFactor} />
            </div>
            {twoFactor && (
              <div className="mt-4 flex items-center gap-4">
                <Button variant="secondary" className="flex-1">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Set up authenticator app
                </Button>
                <Button variant="secondary" className="flex-1">
                  <Key className="w-4 h-4 mr-2" />
                  View backup codes
                </Button>
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <History className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Session Timeout</h2>
                  <p className="text-sm text-gray-500">Automatically log out after period of inactivity</p>
                </div>
              </div>
              <Toggle checked={sessionTimeout} onChange={setSessionTimeout} />
            </div>
            {sessionTimeout && (
              <div className="mt-4">
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10">
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
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Password Rotation</h2>
                  <p className="text-sm text-gray-500">Require password change every 90 days</p>
                </div>
              </div>
              <Toggle checked={passwordRotation} onChange={setPasswordRotation} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <LogOut className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Active Sessions</h2>
              <p className="text-sm text-gray-500">Manage your active sessions across devices</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { device: 'MacBook Pro', location: 'San Francisco, CA', lastActive: 'Current session' },
              { device: 'iPhone 12', location: 'San Francisco, CA', lastActive: '2 hours ago' },
              { device: 'Windows PC', location: 'New York, NY', lastActive: '2 days ago' }
            ].map((session, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{session.device}</h3>
                  <p className="text-sm text-gray-500">{session.location} · {session.lastActive}</p>
                </div>
                {session.lastActive !== 'Current session' && (
                  <Button variant="ghost" className="text-red-600 hover:bg-red-50">
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">Security Recommendations</h3>
              <p className="text-sm text-gray-500 mt-1">
                Enable two-factor authentication and use a strong, unique password to better protect your account.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};