import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { X, Building, BarChart, Calendar, RefreshCw, FileText } from 'lucide-react';

interface ModelType {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const modelTypes: ModelType[] = [
  {
    id: 'saas',
    title: 'SaaS',
    description: 'Subscription-based software business model',
    icon: Building
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce',
    description: 'Online retail and digital commerce',
    icon: BarChart
  },
  {
    id: 'hardware',
    title: 'Hardware',
    description: 'Physical product manufacturing and sales',
    icon: RefreshCw
  },
  {
    id: 'software',
    title: 'Software',
    description: 'Traditional software licensing model',
    icon: FileText
  }
];

interface StepProps {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  isDone: boolean;
}

const Step: React.FC<StepProps> = ({ icon: Icon, label, isActive, isDone }) => (
  <div className="flex flex-col items-center gap-2">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
      isActive ? 'bg-[#18181B] text-white' :
      isDone ? 'bg-[#E5FFCA] text-[#18181B]' :
      'bg-gray-100 text-gray-400'
    }`}>
      <Icon className="w-5 h-5" />
    </div>
    <span className="text-sm font-medium text-gray-600">{label}</span>
  </div>
);

export const DemoModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Building, label: 'Model Type' },
    { icon: BarChart, label: 'Key Metrics' },
    { icon: Calendar, label: 'Projections' },
    { icon: RefreshCw, label: 'Integrations' },
    { icon: FileText, label: 'Review' }
  ];

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Create New Model</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex justify-between mb-8">
                {steps.map((step, index) => (
                  <Step
                    key={index}
                    icon={step.icon}
                    label={step.label}
                    isActive={index === currentStep}
                    isDone={index < currentStep}
                  />
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Select Model Type</h3>
                <div className="grid grid-cols-2 gap-4">
                  {modelTypes.map((type) => (
                    <button
                      key={type.id}
                      className="p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                          <type.icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <h4 className="font-medium text-gray-900">{type.title}</h4>
                      </div>
                      <p className="text-sm text-gray-500">{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
                <Button variant="secondary" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
                >
                  Continue
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};