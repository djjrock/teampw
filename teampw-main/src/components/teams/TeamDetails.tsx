import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Users, Mail, Settings, Trash2, UserPlus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Member';
  joinedAt: string;
}

const mockMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@company.com',
    role: 'Admin',
    joinedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@company.com',
    role: 'Manager',
    joinedAt: '2024-02-01'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@company.com',
    role: 'Member',
    joinedAt: '2024-03-10'
  }
];

export const TeamDetails: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#E5FFCA] dark:bg-[#0a0a0a] rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-[#18181B] dark:text-gray-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Engineering Team</h1>
            <p className="text-gray-500 dark:text-gray-400">8 members · Created Jan 15, 2024</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="secondary"
            className={cn(
              "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent",
              "hover:bg-gray-50 dark:hover:bg-[#323232] text-gray-900 dark:text-white"
            )}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button className={cn(
            "bg-[#18181B] hover:bg-[#27272A]",
            "dark:bg-[#E5FFCA] dark:hover:bg-[#E5FFCA]/90",
            "text-white dark:text-[#18181B]"
          )}>
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Members
          </Button>
        </div>
      </div>

      <Card className={cn(
        "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent"
      )}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Team Members</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search members..."
                className={cn(
                  "px-3 py-1.5 text-sm border rounded-lg transition-colors",
                  "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                  "text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
                  "focus:outline-none focus:ring-2 focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10"
                )}
              />
            </div>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-[#323232]">
            {mockMembers.map((member) => (
              <div key={member.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-[#0a0a0a] rounded-full flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-600 dark:text-gray-400">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Joined {member.joinedAt}
                  </span>
                  <select
                    defaultValue={member.role}
                    className={cn(
                      "px-3 py-1.5 text-sm border rounded-lg transition-colors appearance-none",
                      "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                      "text-gray-900 dark:text-white",
                      "focus:ring-2 focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10"
                    )}
                  >
                    <option>Admin</option>
                    <option>Manager</option>
                    <option>Member</option>
                  </select>
                  <button className={cn(
                    "p-2 rounded-lg transition-colors",
                    "text-gray-400 hover:text-red-600 dark:hover:text-red-500",
                    "hover:bg-red-50 dark:hover:bg-red-900/10"
                  )}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className={cn(
        "p-6",
        "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent"
      )}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Danger Zone</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Irreversible and destructive actions</p>
          </div>
          <Button 
            variant="ghost" 
            className={cn(
              "text-red-600 dark:text-red-500",
              "hover:bg-red-50 dark:hover:bg-red-900/10"
            )}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Team
          </Button>
        </div>
      </Card>
    </div>
  );
};