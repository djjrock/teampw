import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Users, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Team {
  id: string;
  name: string;
  memberCount: number;
  avatars: string[];
  createdAt: string;
  status: 'active' | 'inactive';
}

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Engineering Team',
    memberCount: 8,
    avatars: ['J', 'A', 'M', 'S'],
    createdAt: 'Jan 15, 2024',
    status: 'active'
  },
  {
    id: '2',
    name: 'Design Team',
    memberCount: 5,
    avatars: ['R', 'K', 'L'],
    createdAt: 'Jan 10, 2024',
    status: 'active'
  },
  {
    id: '3',
    name: 'Marketing Team',
    memberCount: 6,
    avatars: ['P', 'T', 'E', 'D'],
    createdAt: 'Jan 5, 2024',
    status: 'inactive'
  }
];

export const TeamManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Teams</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your team workspaces</p>
        </div>
        <Button className={cn(
          "bg-[#18181B] hover:bg-[#27272A]",
          "dark:bg-[#E5FFCA] dark:hover:bg-[#E5FFCA]/90",
          "text-white dark:text-[#18181B]"
        )}>
          <Plus className="w-4 h-4 mr-2" />
          Create Team
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTeams.map((team) => (
          <Link key={team.id} to={`/teams/${team.id}`}>
            <Card className={cn(
              "p-6 transition-all duration-200",
              "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent",
              "hover:border-[#E5FFCA] dark:hover:border-[#E5FFCA]",
              "hover:shadow-lg dark:hover:shadow-[#E5FFCA]/5"
            )}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#E5FFCA] dark:bg-[#0a0a0a] rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#18181B] dark:text-gray-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 dark:text-white">{team.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{team.memberCount} members</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex -space-x-2">
                  {team.avatars.map((initial, index) => (
                    <div
                      key={index}
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center border-2",
                        "bg-gray-100 dark:bg-[#0a0a0a] border-white dark:border-[#27272A]"
                      )}
                    >
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {initial}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Created {team.createdAt}
                  </span>
                  <span className={cn(
                    "text-sm font-medium",
                    team.status === 'active' ? 'text-green-600 dark:text-green-500' : 'text-gray-500 dark:text-gray-400'
                  )}>
                    {team.status}
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};