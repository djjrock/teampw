import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Shield, CreditCard, Bell, User, ChevronRight, Palette } from 'lucide-react';
import { cn } from '../../lib/utils';

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
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>

      <div className="space-y-4">
        {settingsSections.map((section) => (
          <Card 
            key={section.title} 
            className={cn(
              "p-4 transition-colors cursor-pointer",
              "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent",
              "hover:bg-gray-50 dark:hover:bg-[#323232]"
            )}
            onClick={() => section.path && navigate(section.path)}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 dark:bg-[#0a0a0a] rounded-full flex items-center justify-center">
                <section.Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">{section.title}</h3>
                  {section.badge && (
                    <span className={cn(
                      "px-2 py-0.5 text-xs font-medium rounded-full",
                      section.badge === 'PRO' 
                        ? "bg-[#E5FFCA] text-[#18181B]"
                        : section.badge === 'DEV'
                        ? "bg-[#E5FFCA] text-[#18181B]"
                        : "bg-gray-100 dark:bg-[#0a0a0a] text-gray-600 dark:text-gray-400"
                    )}>
                      {section.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{section.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-600" />
            </div>
          </Card>
        ))}

        <Card className={cn(
          "p-4 mt-8",
          "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent"
        )}>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-red-50 dark:bg-[#0a0a0a] rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-600 dark:text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium text-red-600 dark:text-red-500">Danger Zone</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Delete account and data</p>
            </div>
            <button className="text-red-600 dark:text-red-500 text-sm font-medium hover:text-red-700 dark:hover:text-red-400">
              Delete Account
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};