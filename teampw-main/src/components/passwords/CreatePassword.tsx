import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { X, Eye, EyeOff, Copy, RefreshCw, Key, Plus, Tag, Globe, Mail, Server, CreditCard, Lock, Smartphone, Laptop } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CreatePasswordProps {
  onClose: () => void;
}

const icons = [
  { icon: Key, label: 'Key' },
  { icon: Globe, label: 'Website' },
  { icon: Mail, label: 'Email' },
  { icon: Server, label: 'Server' },
  { icon: CreditCard, label: 'Payment' },
  { icon: Lock, label: 'Security' },
  { icon: Smartphone, label: 'Mobile' },
  { icon: Laptop, label: 'Device' },
];

export const CreatePassword: React.FC<CreatePasswordProps> = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    url: '',
    category: '',
    notes: '',
  });

  const categories = ['Social', 'Email', 'Servers', 'Finance', 'Development', 'Other'];

  const generatePassword = () => {
    const length = 16;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData({ ...formData, password });
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      categories.push(newCategory);
      setFormData({ ...formData, category: newCategory });
      setNewCategory('');
      setShowNewCategory(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className={cn(
        "w-full max-w-2xl",
        "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              "bg-[#F4F4F5] dark:bg-[#323232]"
            )}>
              <selectedIcon.icon className="w-5 h-5 text-[#18181B] dark:text-[#E5FFCA]" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Password</h2>
          </div>
          <button
            onClick={onClose}
            className={cn(
              "p-2 rounded-lg transition-colors",
              "hover:bg-gray-100 dark:hover:bg-[#323232]"
            )}
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form className="p-6 space-y-6">
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Choose Icon
            </label>
            <div className="grid grid-cols-4 gap-2">
              {icons.map((icon) => (
                <button
                  key={icon.label}
                  type="button"
                  onClick={() => setSelectedIcon(icon)}
                  className={cn(
                    "p-3 rounded-lg flex flex-col items-center gap-2 transition-colors",
                    selectedIcon === icon
                      ? "bg-[#18181B] dark:bg-[#E5FFCA] text-white dark:text-[#18181B]"
                      : "bg-gray-50 dark:bg-[#323232] text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#404040]"
                  )}
                >
                  <icon.icon className="w-5 h-5" />
                  <span className="text-xs">{icon.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={cn(
                  "w-full px-3 py-2 border rounded-lg transition-colors",
                  "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                  "text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
                  "focus:ring-2 focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10"
                )}
                placeholder="e.g., Company Gmail"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Category
              </label>
              {!showNewCategory ? (
                <div className="flex gap-2">
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={cn(
                      "flex-1 px-3 py-2 border rounded-lg transition-colors",
                      "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                      "text-gray-900 dark:text-white",
                      "focus:ring-2 focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10"
                    )}
                  >
                    <option value="" className="dark:bg-[#0a0a0a]">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category} className="dark:bg-[#0a0a0a]">
                        {category}
                      </option>
                    ))}
                  </select>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowNewCategory(true)}
                    className="bg-white dark:bg-[#27272A] text-gray-900 dark:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className={cn(
                        "w-full pl-10 pr-3 py-2 border rounded-lg transition-colors",
                        "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                        "text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
                        "focus:ring-2 focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10"
                      )}
                      placeholder="New category name"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleAddCategory}
                    className="bg-white dark:bg-[#27272A] text-gray-900 dark:text-white"
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowNewCategory(false)}
                    className="text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#323232]"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Username / Email
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className={cn(
                "w-full px-3 py-2 border rounded-lg transition-colors",
                "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                "text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
                "focus:ring-2 focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10"
              )}
              placeholder="username@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={cn(
                  "w-full px-3 py-2 pr-24 border rounded-lg transition-colors",
                  "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                  "text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
                  "focus:ring-2 focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10"
                )}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={cn(
                    "p-1.5 rounded-md transition-colors",
                    "text-gray-400 dark:text-gray-500",
                    "hover:text-gray-600 dark:hover:text-gray-300",
                    "hover:bg-gray-100 dark:hover:bg-[#323232]"
                  )}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(formData.password)}
                  className={cn(
                    "p-1.5 rounded-md transition-colors",
                    "text-gray-400 dark:text-gray-500",
                    "hover:text-gray-600 dark:hover:text-gray-300",
                    "hover:bg-gray-100 dark:hover:bg-[#323232]"
                  )}
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={generatePassword}
                  className={cn(
                    "p-1.5 rounded-md transition-colors",
                    "text-gray-400 dark:text-gray-500",
                    "hover:text-gray-600 dark:hover:text-gray-300",
                    "hover:bg-gray-100 dark:hover:bg-[#323232]"
                  )}
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Website URL
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className={cn(
                "w-full px-3 py-2 border rounded-lg transition-colors",
                "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                "text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
                "focus:ring-2 focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10"
              )}
              placeholder="https://example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className={cn(
                "w-full px-3 py-2 border rounded-lg transition-colors resize-none",
                "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                "text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
                "focus:ring-2 focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10"
              )}
              placeholder="Additional notes..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <Button 
              variant="secondary" 
              onClick={onClose}
              className="bg-white dark:bg-[#27272A] text-gray-900 dark:text-white"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-[#18181B] hover:bg-[#27272A] dark:bg-[#E5FFCA] dark:hover:bg-[#E5FFCA]/90 text-white dark:text-[#18181B]"
            >
              Save Password
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};