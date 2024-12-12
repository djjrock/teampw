import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ChevronLeft, Camera, User, Mail, Phone, MapPin, Building2 } from 'lucide-react';

export const ProfileSettings: React.FC = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/settings')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={imageUrl}
                alt="Profile"
                className="w-24 h-24 rounded-xl object-cover"
              />
              <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Profile Photo</h2>
              <p className="text-sm text-gray-500 mt-1">
                This will be displayed on your profile and in team settings
              </p>
            </div>
          </div>
        </Card>

        <Card className="divide-y divide-gray-100">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    defaultValue="Sarah Wilson"
                    className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    defaultValue="sarah@company.com"
                    className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    defaultValue="San Francisco, CA"
                    className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Department</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10 appearance-none bg-white">
                    <option>Design</option>
                    <option>Engineering</option>
                    <option>Product</option>
                    <option>Marketing</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Bio</label>
              <textarea
                rows={4}
                defaultValue="Senior Product Designer with 5+ years of experience in creating user-centered digital products."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900/10 resize-none"
              />
              <p className="text-sm text-gray-500">
                Brief description for your profile.
              </p>
            </div>
          </div>

          <div className="p-6 flex justify-end gap-3">
            <Button variant="secondary" onClick={() => navigate('/settings')}>
              Cancel
            </Button>
            <Button>
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};