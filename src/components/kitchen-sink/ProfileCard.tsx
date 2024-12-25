import React from 'react';
import { Card } from '../ui/Card';
import { Mail, Phone, Building, MapPin } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  imageUrl: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  department,
  email,
  phone,
  location,
  imageUrl
}) => {
  return (
    <Card className="max-w-sm">
      <div className="relative h-32 bg-gradient-to-r from-[#E5FFCA] to-[#18181B] rounded-t-xl">
        <div className="absolute -bottom-12 left-6">
          <div className="w-24 h-24 rounded-xl border-4 border-white bg-white shadow-sm overflow-hidden">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      <div className="p-6 pt-16">
        <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
        <p className="text-gray-500">{title}</p>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <Building className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-medium text-gray-900">{department}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <Mail className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <a href={`mailto:${email}`} className="font-medium text-gray-900 hover:underline">
                {email}
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <Phone className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium text-gray-900">{phone}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium text-gray-900">{location}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};