import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Copy, 
  Link, 
  Shield,
  Key, 
  Globe, 
  CheckCircle2, 
  ArrowRight,
  X,
  type LucideIcon
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface AccessLog {
  id: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  action: 'created' | 'viewed' | 'edited' | 'copied' | 'shared';
  details?: string;
  timestamp: string;
}

interface Password {
  id: string;
  name: string;
  username: string;
  password: string;
  url: string;
  category: string;
  strength: string;
  createdBy: string;
  createdAt: string;
  lastModified: string;
  notes: string;
}

interface ActionIconProps {
  action: AccessLog['action'];
}

const ActionIcon: React.FC<ActionIconProps> = ({ action }) => {
  const icons: Record<AccessLog['action'], LucideIcon> = {
    created: Shield,
    viewed: Eye,
    copied: Copy,
    edited: Shield,
    shared: Link
  };

  const colors: Record<AccessLog['action'], string> = {
    created: 'text-green-500',
    viewed: 'text-blue-500',
    copied: 'text-purple-500',
    edited: 'text-orange-500',
    shared: 'text-indigo-500'
  };

  const IconComponent = icons[action];
  return <IconComponent className={cn('w-4 h-4', colors[action])} />;
};

export const PasswordDetails: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const mockPassword: Password = {
    id: '1',
    name: 'Company Gmail',
    username: 'admin@company.com',
    password: 'super-secure-password-123',
    url: 'https://gmail.com',
    category: 'Email',
    strength: 'Strong',
    createdBy: 'Jordan Smith',
    createdAt: '2024-02-15 09:30',
    lastModified: '2024-03-15 14:30',
    notes: 'Main company email account for administrative purposes.',
  };

  const mockLogs: AccessLog[] = [
    {
      id: '1',
      user: {
        name: 'Alice Johnson',
        email: 'alice@company.com',
      },
      action: 'copied',
      timestamp: '2024-03-15 16:45'
    },
    {
      id: '2',
      user: {
        name: 'Bob Wilson',
        email: 'bob@company.com',
      },
      action: 'edited',
      details: 'Updated password',
      timestamp: '2024-03-15 14:30'
    },
    {
      id: '3',
      user: {
        name: 'Carol Davis',
        email: 'carol@company.com',
      },
      action: 'shared',
      details: 'Shared with Marketing Team',
      timestamp: '2024-03-14 11:20'
    },
    {
      id: '4',
      user: {
        name: 'Jordan Smith',
        email: 'jordan@company.com',
      },
      action: 'created',
      timestamp: '2024-02-15 09:30'
    }
  ];

  const handleClose = () => {
    navigate(-1);
  };

  const handleCopyPassword = async () => {
    await navigator.clipboard.writeText(mockPassword.password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4")}>
      <Card className={cn("w-full max-w-4xl bg-white dark:bg-[#27272A]")}>
        <div className={cn("flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800")}>
          <div className="flex items-center gap-3">
            <div className={cn("w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center")}>
              <Key className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            </div>
            <div>
              <h2 className={cn("text-xl font-semibold text-gray-900 dark:text-white")}>{mockPassword.name}</h2>
              <p className={cn("text-sm text-gray-500 dark:text-gray-400")}>{mockPassword.category}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className={cn(
              "p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            )}
          >
            <Shield className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className={cn("p-6 grid grid-cols-3 gap-6")}>
          <div className="col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className={cn("text-sm font-medium text-gray-700 dark:text-gray-200")}>Username / Email</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={mockPassword.username}
                    readOnly
                    className={cn(
                      "flex-1 px-3 py-2 bg-gray-50 dark:bg-[#18181B]",
                      "border border-gray-200 dark:border-gray-700 rounded-lg",
                      "text-gray-600 dark:text-gray-200"
                    )}
                  />
                  <Button
                    variant="secondary"
                    onClick={() => navigator.clipboard.writeText(mockPassword.username)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className={cn("text-sm font-medium text-gray-700 dark:text-gray-200")}>Password</label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={mockPassword.password}
                      readOnly
                      className={cn(
                        "w-full px-3 py-2 bg-gray-50 dark:bg-[#18181B]",
                        "border border-gray-200 dark:border-gray-700 rounded-lg",
                        "text-gray-600 dark:text-gray-200"
                      )}
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      )}
                    </button>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={handleCopyPassword}
                  >
                    {copied ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className={cn("text-sm font-medium text-gray-700 dark:text-gray-200")}>Website URL</label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <input
                      type="url"
                      value={mockPassword.url}
                      readOnly
                      className={cn(
                        "w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-[#18181B]",
                        "border border-gray-200 dark:border-gray-700 rounded-lg",
                        "text-gray-600 dark:text-gray-200"
                      )}
                    />
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => window.open(mockPassword.url, '_blank')}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className={cn("text-sm font-medium text-gray-700 dark:text-gray-200")}>Notes</label>
                <textarea
                  value={mockPassword.notes}
                  readOnly
                  rows={3}
                  className={cn(
                    "w-full px-3 py-2 bg-gray-50 dark:bg-[#18181B]",
                    "border border-gray-200 dark:border-gray-700 rounded-lg",
                    "text-gray-600 dark:text-gray-200 resize-none"
                  )}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className={cn("bg-gray-50 dark:bg-[#18181B] p-4 rounded-lg space-y-3")}>
              <div className="flex items-center justify-between text-sm">
                <span className={cn("text-gray-500 dark:text-gray-400")}>Created by</span>
                <span className={cn("font-medium text-gray-900 dark:text-white")}>{mockPassword.createdBy}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={cn("text-gray-500 dark:text-gray-400")}>Created at</span>
                <span className={cn("font-medium text-gray-900 dark:text-white")}>{mockPassword.createdAt}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={cn("text-gray-500 dark:text-gray-400")}>Last modified</span>
                <span className={cn("font-medium text-gray-900 dark:text-white")}>{mockPassword.lastModified}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={cn("text-gray-500 dark:text-gray-400")}>Strength</span>
                <span className={cn(
                  "px-2 py-0.5 bg-[#E5FFCA] text-[#18181B] rounded-full text-xs font-medium"
                )}>
                  {mockPassword.strength}
                </span>
              </div>
            </div>

            <Button variant="secondary" className="w-full">
              <Shield className="w-4 h-4 mr-2" />
              View Password History
            </Button>
          </div>
        </div>

        <div className={cn("border-t border-gray-100 dark:border-gray-800 p-6")}>
          <h3 className={cn("text-lg font-medium text-gray-900 dark:text-white mb-4")}>Activity Log</h3>
          <div className="space-y-4">
            {mockLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3">
                <div className="mt-1">
                  <ActionIcon action={log.action} />
                </div>
                <div className="flex-1">
                  <p className={cn("text-sm text-gray-900 dark:text-white")}>
                    <span className="font-medium">{log.user.name}</span>
                    {' '}{log.action} this password
                  </p>
                  {log.details && (
                    <p className={cn("text-sm text-gray-500 dark:text-gray-400")}>{log.details}</p>
                  )}
                  <p className={cn("text-xs text-gray-500 dark:text-gray-400 mt-1")}>{log.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};