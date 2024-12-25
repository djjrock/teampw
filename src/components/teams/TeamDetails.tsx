import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Users, Mail, Settings, Trash2, UserPlus } from 'lucide-react';

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
          <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-gray-800" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Engineering Team</h1>
            <p className="text-gray-500">8 members · Created Jan 15, 2024</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button className="bg-[#101827] hover:bg-gray-800">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Members
          </Button>
        </div>
      </div>

      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Team Members</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search members..."
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10"
              />
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {mockMembers.map((member) => (
              <div key={member.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-600">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    Joined {member.joinedAt}
                  </span>
                  <select
                    defaultValue={member.role}
                    className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white"
                  >
                    <option>Admin</option>
                    <option>Manager</option>
                    <option>Member</option>
                  </select>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Danger Zone</h2>
            <p className="text-sm text-gray-500">Irreversible and destructive actions</p>
          </div>
          <Button variant="ghost" className="text-red-600 hover:bg-red-50">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Team
          </Button>
        </div>
      </Card>
    </div>
  );
};