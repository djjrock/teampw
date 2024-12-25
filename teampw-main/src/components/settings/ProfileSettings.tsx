import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ChevronLeft, Camera, User, Mail, Phone, MapPin, Building2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ProfileSettings: React.FC = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/settings')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-[#323232] rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-500 dark:text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
      </div>

      <div className="space-y-6">
        <Card className={cn(
          "p-6",
          "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent"
        )}>
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={imageUrl}
                alt="Profile"
                className="w-24 h-24 rounded-xl object-cover"
              />
              <button className={cn(
                "absolute -bottom-2 -right-2 p-2 rounded-full shadow-lg transition-colors",
                "bg-white dark:bg-[#27272A] border border-gray-200 dark:border-transparent",
                "hover:bg-gray-50 dark:hover:bg-[#323232]"
              )}>
                <Camera className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Photo</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                This will be displayed on your profile and in team settings
              </p>
            </div>
          </div>
        </Card>

        <Card className={cn(
          "divide-y dark:divide-[#323232]",
          "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent"
        )}>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-600" />
                  <input
                    type="text"
                    defaultValue="Sarah Wilson"
                    className={cn(
                      "w-full pl-10 pr-3 py-2 border rounded-lg transition-colors",
                      "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                      "text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
                      "focus:ring-2 focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10"
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-600" />
                  <input
                    type="email"
                    defaultValue="sarah@company.com"
                    className={cn(
                      "w-full pl-10 pr-3 py-2 border rounded-lg transition-colors",
                      "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                      "text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
                      "focus:ring-2 focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10"
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className={cn(
                      "w-full pl-10 pr-3 py-2 border rounded-lg transition-colors",
                      "bg-white dark:bg-[#18181B] border-gray-200 dark:border-gray-800",
                      "text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400",
                      "focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-gray-100/10"
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    defaultValue="San Francisco, CA"
                    className={cn(
                      "w-full pl-10 pr-3 py-2 border rounded-lg transition-colors",
                      "bg-white dark:bg-[#18181B] border-gray-200 dark:border-gray-800",
                      "text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400",
                      "focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-gray-100/10"
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Department</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-600" />
                  <select className={cn(
                    "w-full pl-10 pr-3 py-2 border rounded-lg transition-colors appearance-none",
                    "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                    "text-gray-900 dark:text-white",
                    "focus:ring-2 focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10"
                  )}>
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
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About</h2>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Bio</label>
              <textarea
                rows={4}
                defaultValue="Senior Product Designer with 5+ years of experience in creating user-centered digital products."
                className={cn(
                  "w-full px-3 py-2 border rounded-lg transition-colors resize-none",
                  "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                  "text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
                  "focus:ring-2 focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10"
                )}
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Brief description for your profile.
              </p>
            </div>
          </div>

          <div className="p-6 flex justify-end gap-3">
            <Button 
              variant="secondary"
              onClick={() => navigate('/settings')}
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
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};