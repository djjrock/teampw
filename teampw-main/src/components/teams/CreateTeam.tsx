import React from 'react';
import { Dialog } from '@headlessui/react';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CreateTeamProps {
  onClose: () => void;
}

export const CreateTeam: React.FC<CreateTeamProps> = ({ onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={cn(
          "w-full max-w-md rounded-lg p-6",
          "bg-white dark:bg-[#27272A] border border-gray-200 dark:border-transparent"
        )}>
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
              Create New Team
            </Dialog.Title>
            <button
              onClick={onClose}
              className={cn(
                "p-2 rounded-lg transition-colors",
                "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
                "hover:bg-gray-100 dark:hover:bg-[#323232]"
              )}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form className="space-y-4">
            <div>
              <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Team Name
              </label>
              <input
                type="text"
                id="teamName"
                placeholder="Enter team name"
                className={cn(
                  "w-full px-3 py-2 rounded-lg border transition-colors",
                  "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                  "text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
                  "focus:outline-none focus:ring-2 focus:ring-[#E5FFCA]/10"
                )}
              />
            </div>

            <div>
              <label htmlFor="teamDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="teamDescription"
                rows={3}
                placeholder="Enter team description"
                className={cn(
                  "w-full px-3 py-2 rounded-lg border transition-colors",
                  "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                  "text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
                  "focus:outline-none focus:ring-2 focus:ring-[#E5FFCA]/10"
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Security Level
              </label>
              <div className="space-y-2">
                {['Basic', 'Advanced', 'Enterprise'].map((level) => (
                  <label
                    key={level}
                    className={cn(
                      "flex items-center p-3 rounded-lg border cursor-pointer transition-colors",
                      "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                      "hover:bg-gray-50 dark:hover:bg-[#18181B]"
                    )}
                  >
                    <input
                      type="radio"
                      name="securityLevel"
                      value={level}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {level}
                        </p>
                        <div className={cn(
                          "w-4 h-4 rounded-full border-2",
                          "border-gray-300 dark:border-gray-600"
                        )} />
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {level === 'Basic' && 'Essential security features for small teams'}
                        {level === 'Advanced' && 'Enhanced security with 2FA and audit logs'}
                        {level === 'Enterprise' && 'Full security suite with custom policies'}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="secondary"
                onClick={onClose}
                className={cn(
                  "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent",
                  "hover:bg-gray-50 dark:hover:bg-[#323232] text-gray-900 dark:text-white"
                )}
              >
                Cancel
              </Button>
              <Button className={cn(
                "bg-[#18181B] hover:bg-[#27272A]",
                "dark:bg-[#E5FFCA] dark:hover:bg-[#E5FFCA]/90",
                "text-white dark:text-[#18181B]"
              )}>
                Create Team
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};