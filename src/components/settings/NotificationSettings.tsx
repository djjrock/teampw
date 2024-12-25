import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Toggle } from '../ui/Toggle';
import { ChevronLeft, Bell, Mail, Smartphone, Slack } from 'lucide-react';

interface NotificationSectionProps {
  title: string;
  description: string;
  icon: React.ElementType;
  options: {
    id: string;
    label: string;
    description: string;
    enabled: boolean;
    onChange: (enabled: boolean) => void;
  }[];
}

const NotificationSection: React.FC<NotificationSectionProps> = ({
  title,
  description,
  icon: Icon,
  options
}) => (
  <div className="p-6">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-gray-600" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>

    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.id} className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-gray-900">{option.label}</h3>
            <p className="text-sm text-gray-500">{option.description}</p>
          </div>
          <Toggle checked={option.enabled} onChange={option.onChange} />
        </div>
      ))}
    </div>
  </div>
);

export const NotificationSettings: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = React.useState({
    passwordExpiring: true,
    newTeamMember: true,
    securityAlerts: true,
    productUpdates: false,
    emailDigest: true,
    marketingEmails: false,
    pushEnabled: true,
    pushSecurityAlerts: true,
    slackEnabled: true,
    slackMentions: true
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/settings')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Notification Settings</h1>
      </div>

      <Card className="divide-y divide-gray-100">
        <NotificationSection
          title="In-App Notifications"
          description="Manage your in-app notification preferences"
          icon={Bell}
          options={[
            {
              id: 'passwordExpiring',
              label: 'Password Expiring Soon',
              description: 'Get notified when your passwords are about to expire',
              enabled: notifications.passwordExpiring,
              onChange: (enabled) => setNotifications(prev => ({ ...prev, passwordExpiring: enabled }))
            },
            {
              id: 'newTeamMember',
              label: 'New Team Member',
              description: 'Get notified when someone joins your team',
              enabled: notifications.newTeamMember,
              onChange: (enabled) => setNotifications(prev => ({ ...prev, newTeamMember: enabled }))
            },
            {
              id: 'securityAlerts',
              label: 'Security Alerts',
              description: 'Receive alerts about security-related events',
              enabled: notifications.securityAlerts,
              onChange: (enabled) => setNotifications(prev => ({ ...prev, securityAlerts: enabled }))
            },
            {
              id: 'productUpdates',
              label: 'Product Updates',
              description: 'Stay informed about new features and improvements',
              enabled: notifications.productUpdates,
              onChange: (enabled) => setNotifications(prev => ({ ...prev, productUpdates: enabled }))
            }
          ]}
        />

        <NotificationSection
          title="Email Notifications"
          description="Manage your email notification preferences"
          icon={Mail}
          options={[
            {
              id: 'emailDigest',
              label: 'Weekly Digest',
              description: 'Receive a weekly summary of activity',
              enabled: notifications.emailDigest,
              onChange: (enabled) => setNotifications(prev => ({ ...prev, emailDigest: enabled }))
            },
            {
              id: 'marketingEmails',
              label: 'Marketing Emails',
              description: 'Receive emails about new features and offers',
              enabled: notifications.marketingEmails,
              onChange: (enabled) => setNotifications(prev => ({ ...prev, marketingEmails: enabled }))
            }
          ]}
        />

        <NotificationSection
          title="Push Notifications"
          description="Manage your mobile push notification preferences"
          icon={Smartphone}
          options={[
            {
              id: 'pushEnabled',
              label: 'Enable Push Notifications',
              description: 'Receive notifications on your mobile device',
              enabled: notifications.pushEnabled,
              onChange: (enabled) => setNotifications(prev => ({ ...prev, pushEnabled: enabled }))
            },
            {
              id: 'pushSecurityAlerts',
              label: 'Security Alerts',
              description: 'Get immediate alerts for security events',
              enabled: notifications.pushSecurityAlerts,
              onChange: (enabled) => setNotifications(prev => ({ ...prev, pushSecurityAlerts: enabled }))
            }
          ]}
        />

        <NotificationSection
          title="Slack Integration"
          description="Manage your Slack notification preferences"
          icon={Slack}
          options={[
            {
              id: 'slackEnabled',
              label: 'Enable Slack Notifications',
              description: 'Receive notifications in your Slack workspace',
              enabled: notifications.slackEnabled,
              onChange: (enabled) => setNotifications(prev => ({ ...prev, slackEnabled: enabled }))
            },
            {
              id: 'slackMentions',
              label: 'Mentions & Direct Messages',
              description: 'Get notified when you are mentioned or receive a DM',
              enabled: notifications.slackMentions,
              onChange: (enabled) => setNotifications(prev => ({ ...prev, slackMentions: enabled }))
            }
          ]}
        />

        <div className="p-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => navigate('/settings')}>
            Cancel
          </Button>
          <Button>
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
};