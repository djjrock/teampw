import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { X, Users, Plus, Search } from 'lucide-react';

interface CreateTeamProps {
  onClose: () => void;
}

export const CreateTeam: React.FC<CreateTeamProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState('');

  const handleAddEmail = () => {
    if (currentEmail && !inviteEmails.includes(currentEmail)) {
      setInviteEmails([...inviteEmails, currentEmail]);
      setCurrentEmail('');
    }
  };

  const handleRemoveEmail = (email: string) => {
    setInviteEmails(inviteEmails.filter(e => e !== email));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-lime-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-800" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Create New Team</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Team Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-transparent transition-shadow"
              placeholder="e.g., Engineering Team"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-transparent transition-shadow resize-none"
              placeholder="Brief description of the team..."
            />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">
              Invite Team Members
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={currentEmail}
                  onChange={(e) => setCurrentEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddEmail())}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-transparent transition-shadow"
                  placeholder="Enter email address"
                />
              </div>
              <Button 
                type="button"
                onClick={handleAddEmail}
                variant="secondary"
              >
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>

            {inviteEmails.length > 0 && (
              <div className="space-y-2">
                {inviteEmails.map((email) => (
                  <div
                    key={email}
                    className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-600">{email}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEmail(email)}
                      className="p-1 hover:bg-gray-200 rounded-full"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#101827] hover:bg-gray-800">
              Create Team
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};