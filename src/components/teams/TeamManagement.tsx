import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Plus, Users, Key, ChevronRight } from 'lucide-react';
import { CreateTeam } from './CreateTeam';

interface Team {
  id: string;
  name: string;
  description: string;
  membersCount: number;
  passwordsCount: number;
  lastActive: string;
  role: 'Owner' | 'Admin' | 'Member';
  strength: 'Strong' | 'Medium' | 'Weak';
}

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Engineering Team',
    description: 'Development and DevOps team credentials',
    membersCount: 12,
    passwordsCount: 45,
    lastActive: '2 hours ago',
    role: 'Owner',
    strength: 'Strong'
  },
  {
    id: '2',
    name: 'Marketing Team',
    description: 'Social media and marketing tools access',
    membersCount: 8,
    passwordsCount: 23,
    lastActive: '1 day ago',
    role: 'Admin',
    strength: 'Medium'
  },
  {
    id: '3',
    name: 'Finance Team',
    description: 'Financial services and banking credentials',
    membersCount: 5,
    passwordsCount: 15,
    lastActive: '3 days ago',
    role: 'Member',
    strength: 'Weak'
  }
];

export const TeamManagement: React.FC = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="bg-[#18181B] hover:bg-[#27272A] text-white w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Team
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockTeams.map((team) => (
          <Card 
            key={team.id} 
            className="p-4 hover:shadow-md transition-all cursor-pointer"
            onClick={() => navigate(`/teams/${team.id}`)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F4F4F5] rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#18181B]" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{team.name}</h3>
                  <p className="text-sm text-gray-500">{team.description}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                team.strength === 'Strong' 
                  ? 'bg-[#E5FFCA] text-[#18181B]'
                  : team.strength === 'Medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {team.strength}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{team.membersCount} members</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Key className="w-4 h-4" />
                  <span>{team.passwordsCount} passwords</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">
                  Active {team.lastActive}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {showCreateModal && (
        <CreateTeam onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};