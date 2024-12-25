import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Plus, Key, Globe, Copy, Eye, FileText } from 'lucide-react';
import { CreatePassword } from './CreatePassword';
import { CSVImportModal } from './CSVImportModal';
import { cn } from '../../lib/utils';

interface Password {
  id: string;
  name: string;
  username: string;
  password: string;
  url: string;
  category: string;
  lastAccessed: string;
  strength: 'Weak' | 'Medium' | 'Strong';
  notes?: string;
}

const categories = ['All', 'Social', 'Email', 'Servers', 'Finance', 'Development', 'Other'];

const mockPasswords: Password[] = [
  {
    id: '1',
    name: 'Company Gmail',
    username: 'admin@company.com',
    password: '********',
    url: 'https://gmail.com',
    category: 'Email',
    lastAccessed: '2 hours ago',
    strength: 'Strong',
    notes: 'Main company email account'
  },
  {
    id: '2',
    name: 'AWS Console',
    username: 'devops@company.com',
    password: '********',
    url: 'https://aws.amazon.com',
    category: 'Servers',
    lastAccessed: '1 day ago',
    strength: 'Strong',
    notes: 'Production AWS account'
  },
  {
    id: '3',
    name: 'Company Twitter',
    username: 'social@company.com',
    password: '********',
    url: 'https://twitter.com',
    category: 'Social',
    lastAccessed: '3 days ago',
    strength: 'Medium',
    notes: 'Social media account'
  }
];

export const PasswordList: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const filteredPasswords = selectedCategory === 'All'
    ? mockPasswords
    : mockPasswords.filter(password => password.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Password Manager</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={() => setShowImportModal(true)}
            variant="secondary"
            className="w-full sm:w-auto hover:bg-gray-50 dark:bg-[#27272A] dark:hover:bg-[#323232] text-gray-900 dark:text-gray-200"
          >
            <FileText className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-[#18181B] hover:bg-[#27272A] dark:bg-[#E5FFCA] dark:hover:bg-[#E5FFCA]/90 text-white dark:text-[#18181B] w-full sm:w-auto transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Password
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              selectedCategory === category
                ? "bg-[#18181B] dark:bg-[#E5FFCA] text-white dark:text-[#18181B]"
                : "bg-white dark:bg-[#27272A] text-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#323232]"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPasswords.map((password) => (
          <Card 
            key={password.id} 
            className="p-4 hover:shadow-md transition-all cursor-pointer group bg-white dark:bg-[#27272A] border-gray-200 dark:border-gray-800"
            onClick={() => navigate(`/passwords/${password.id}`)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F4F4F5] dark:bg-[#18181B] rounded-full flex items-center justify-center">
                  <Key className="w-5 h-5 text-[#18181B] dark:text-gray-200" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{password.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{password.username}</p>
                </div>
              </div>
              <span className={cn(
                "px-2 py-0.5 text-xs font-medium rounded-full",
                password.strength === 'Strong' 
                  ? "bg-[#E5FFCA] dark:bg-[#E5FFCA] text-[#18181B]"
                  : password.strength === 'Medium'
                  ? "bg-yellow-100 dark:bg-yellow-400 text-yellow-800 dark:text-yellow-900"
                  : "bg-red-100 dark:bg-red-400 text-red-800 dark:text-red-900"
              )}>
                {password.strength}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              <a 
                href={password.url}
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:underline"
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
              >
                {new URL(password.url).hostname}
              </a>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Last accessed {password.lastAccessed}
              </span>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  className="p-1 hover:bg-gray-50 dark:hover:bg-[#323232] rounded-lg transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(password.username);
                  }}
                  aria-label="Copy username"
                >
                  <Copy className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                </button>
                <button 
                  className="p-1 hover:bg-gray-50 dark:hover:bg-[#323232] rounded-lg transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/passwords/${password.id}`);
                  }}
                  aria-label="View password details"
                >
                  <Eye className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {showCreateModal && (
        <CreatePassword onClose={() => setShowCreateModal(false)} />
      )}

      {showImportModal && (
        <CSVImportModal onClose={() => setShowImportModal(false)} />
      )}
    </div>
  );
};