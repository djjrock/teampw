import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Shield, CreditCard, Bell, User, ChevronRight, Palette } from 'lucide-react';

const settingsSections = [
  {
    Icon: User,
    title: 'Profile Settings',
    description: 'Manage your account details and preferences',
    badge: 'FREE',
    action: 'Edit Profile',
    path: '/settings/profile'
  },
  {
    Icon: Shield,
    title: 'Security',
    description: 'Configure security settings and 2FA',
    badge: 'PRO',
    action: 'Update',
    path: '/settings/security'
  },
  {
    Icon: Bell,
    title: 'Notifications',
    description: 'Manage notification preferences',
    badge: null,
    action: 'Configure',
    path: '/settings/notifications'
  },
  {
    Icon: CreditCard,
    title: 'Billing & Plans',
    description: 'Manage your subscription and billing',
    badge: 'FREE',
    action: 'View Plans',
    path: '/settings/billing'
  },
  {
    Icon: Palette,
    title: 'Kitchen Sink',
    description: 'UI component showcase and documentation',
    badge: 'DEV',
    action: 'View Components',
    path: '/settings/kitchen-sink'
  }
];

export const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="space-y-4">
        {settingsSections.map((section) => (
          <Card 
            key={section.title} 
            className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => section.path && navigate(section.path)}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <section.Icon className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-medium text-gray-900">{section.title}</h3>
                  {section.badge && (
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      section.badge === 'PRO' 
                        ? 'bg-[#E5FFCA] text-[#18181B]'
                        : section.badge === 'DEV'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {section.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{section.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        ))}

        <Card className="p-4 mt-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium text-red-600">Danger Zone</h3>
              <p className="text-sm text-gray-500">Delete account and data</p>
            </div>
            <button className="text-red-600 text-sm font-medium hover:text-red-700">
              Delete Account
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};