import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Eye, EyeOff, Copy, Link, Clock, User, Shield, X,
  Calendar, RefreshCw, History, ArrowRight, Key, Globe,
  CheckCircle2, AlertCircle
} from 'lucide-react';

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

const mockPassword = {
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

const ActionIcon = ({ action }: { action: string }) => {
  const icons = {
    created: Shield,
    viewed: Eye,
    copied: Copy,
    edited: RefreshCw,
    shared: Link
  };

  const colors = {
    created: 'text-green-500',
    viewed: 'text-blue-500',
    copied: 'text-purple-500',
    edited: 'text-orange-500',
    shared: 'text-indigo-500'
  };

  const IconComponent = icons[action as keyof typeof icons];
  return <IconComponent className={`w-4 h-4 ${colors[action as keyof typeof colors]}`} />;
};

export const PasswordDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleClose = () => {
    navigate(-1);
  };

  const handleCopyPassword = async () => {
    await navigator.clipboard.writeText(mockPassword.password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Key className="w-5 h-5 text-gray-800" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{mockPassword.name}</h2>
              <p className="text-sm text-gray-500">{mockPassword.category}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Username / Email</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={mockPassword.username}
                    readOnly
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600"
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
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={mockPassword.password}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
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
                <label className="text-sm font-medium text-gray-700">Website URL</label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="url"
                      value={mockPassword.url}
                      readOnly
                      className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600"
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
                <label className="text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  value={mockPassword.notes}
                  readOnly
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Created by</span>
                <span className="font-medium text-gray-900">{mockPassword.createdBy}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Created at</span>
                <span className="font-medium text-gray-900">{mockPassword.createdAt}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Last modified</span>
                <span className="font-medium text-gray-900">{mockPassword.lastModified}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Strength</span>
                <span className="px-2 py-0.5 bg-lime-100 text-gray-800 rounded-full text-xs font-medium">
                  {mockPassword.strength}
                </span>
              </div>
            </div>

            <Button variant="secondary" className="w-full">
              <History className="w-4 h-4 mr-2" />
              View Password History
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-100">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">Activity Log</h3>
          </div>
          <div className="max-h-64 overflow-y-auto px-4 pb-4">
            <div className="space-y-4">
              {mockLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{log.user.name}</span>
                      <ActionIcon action={log.action} />
                      <span className="text-gray-500">
                        {log.action === 'created' ? 'created this password' : 
                         log.action === 'edited' ? 'modified this password' :
                         log.action === 'copied' ? 'copied this password' :
                         log.action === 'shared' ? 'shared this password' :
                         'viewed this password'}
                      </span>
                    </div>
                    {log.details && (
                      <p className="text-sm text-gray-500 mt-0.5">{log.details}</p>
                    )}
                    <span className="text-xs text-gray-400 mt-1 block">
                      {log.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};