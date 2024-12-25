import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Shield, Activity, Lock } from 'lucide-react';

interface Step {
  title: string;
  subtitle: string;
}

const steps: Step[] = [
  {
    title: 'Company Details',
    subtitle: 'Tell us about your organization'
  },
  {
    title: 'Team Setup',
    subtitle: 'Invite your team members'
  },
  {
    title: 'Security Settings',
    subtitle: 'Configure security preferences'
  }
];

export const OnboardingFlow: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    companySize: '',
    teamEmails: '',
    securityPreferences: {
      twoFactor: true,
      passwordRotation: false,
      activityLogs: true
    }
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E5FFCA] focus:border-transparent transition-shadow"
                  placeholder="Acme Inc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Company Size
                </label>
                <select
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E5FFCA] focus:border-transparent transition-shadow appearance-none"
                >
                  <option value="">Select size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201+">201+ employees</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Invite Team Members
              </label>
              <textarea
                value={formData.teamEmails}
                onChange={(e) => setFormData({ ...formData, teamEmails: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E5FFCA] focus:border-transparent transition-shadow resize-none"
                placeholder="Enter email addresses (one per line)"
              />
              <p className="mt-2 text-sm text-gray-500">
                Team members will receive an invitation email to join your workspace
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100">
              <div className="space-y-px">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                      <Lock className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500">Require 2FA for all team members</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.securityPreferences.twoFactor}
                      onChange={(e) => setFormData({
                        ...formData,
                        securityPreferences: {
                          ...formData.securityPreferences,
                          twoFactor: e.target.checked
                        }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#18181B]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                      <Activity className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Password Rotation</h4>
                      <p className="text-sm text-gray-500">Enforce regular password updates</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.securityPreferences.passwordRotation}
                      onChange={(e) => setFormData({
                        ...formData,
                        securityPreferences: {
                          ...formData.securityPreferences,
                          passwordRotation: e.target.checked
                        }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#18181B]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                      <Activity className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Activity Logs</h4>
                      <p className="text-sm text-gray-500">Track all password-related activities</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.securityPreferences.activityLogs}
                      onChange={(e) => setFormData({
                        ...formData,
                        securityPreferences: {
                          ...formData.securityPreferences,
                          activityLogs: e.target.checked
                        }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#18181B]"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-[#E5FFCA] rounded-full flex items-center justify-center mb-6">
            <Shield className="w-7 h-7 text-[#18181B]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Set up your workspace</h1>
          <p className="mt-2 text-gray-600">Complete these steps to get started with TeamPW</p>
        </div>

        <div className="flex justify-between items-start">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center ${
                index !== steps.length - 1 ? 'flex-1' : ''
              }`}
            >
              <div className="flex flex-col items-center text-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium mb-3 ${
                  index < currentStep
                    ? 'bg-[#E5FFCA] text-[#18181B]'
                    : index === currentStep
                    ? 'bg-[#18181B] text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {index < currentStep ? '✓' : index + 1}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{step.title}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{step.subtitle}</div>
                </div>
              </div>
              {index !== steps.length - 1 && (
                <div className="flex-1 h-px bg-[#E5FFCA] mt-6 mx-4" />
              )}
            </div>
          ))}
        </div>

        <Card className="p-6 bg-white shadow-sm">
          {renderStep()}
          
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleNext}
              className="bg-[#18181B] hover:bg-[#27272A] text-white px-6 py-2.5 rounded-xl text-sm font-medium"
            >
              {currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};