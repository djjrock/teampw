import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Building, BarChart, Calendar, RefreshCw, FileText } from 'lucide-react';

interface StepProps {
  icon: React.ElementType;
  label: string;
  description: string;
  isActive: boolean;
  isDone: boolean;
}

const Step: React.FC<StepProps> = ({ icon: Icon, label, description, isActive, isDone }) => (
  <div className="flex flex-col items-center text-center gap-2">
    <div 
      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
        isActive ? 'bg-[#18181B] text-white' :
        isDone ? 'bg-[#E5FFCA] text-[#18181B]' :
        'bg-gray-100 text-gray-400'
      }`}
    >
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <div className="text-sm font-medium text-gray-900">{label}</div>
      <div className="text-sm text-gray-500 mt-0.5">{description}</div>
    </div>
  </div>
);

export const Steps: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(1);

  const steps = [
    { 
      icon: Building, 
      label: 'Business Details', 
      description: 'Company information'
    },
    { 
      icon: BarChart, 
      label: 'Key Metrics', 
      description: 'Performance indicators'
    },
    { 
      icon: Calendar, 
      label: 'Review', 
      description: 'Verify information'
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-start">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className={`flex-1 ${index === steps.length - 1 ? 'flex-initial' : ''}`}>
              <Step
                icon={step.icon}
                label={step.label}
                description={step.description}
                isActive={index === activeStep}
                isDone={index < activeStep}
              />
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mt-6">
                <div className={`h-1 transition-colors ${
                  index < activeStep ? 'bg-[#18181B]' : 'bg-gray-200'
                }`} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button
          variant="secondary"
          onClick={() => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))}
        >
          {activeStep === steps.length - 1 ? 'Complete' : 'Next Step'}
        </Button>
      </div>
    </Card>
  );
};