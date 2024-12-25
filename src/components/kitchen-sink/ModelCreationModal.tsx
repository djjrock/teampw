import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Building2, BarChart, Calendar, RefreshCw, FileSpreadsheet, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Modal } from '../ui/Modal';

type Step = 'type' | 'metrics' | 'projections' | 'integrations' | 'review';

interface ModelCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModelCreationModal: React.FC<ModelCreationModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<Step>('type');
  const [selectedType, setSelectedType] = useState('');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [projectionYears, setProjectionYears] = useState(5);
  const [integrations, setIntegrations] = useState<string[]>([]);

  const steps = [
    { id: 'type', name: 'Model Type', icon: Building2 },
    { id: 'metrics', name: 'Key Metrics', icon: BarChart },
    { id: 'projections', name: 'Projections', icon: Calendar },
    { id: 'integrations', name: 'Integrations', icon: RefreshCw },
    { id: 'review', name: 'Review', icon: FileSpreadsheet }
  ];

  const modelTypes = [
    { id: 'saas', name: 'SaaS', description: 'Subscription-based software business model' },
    { id: 'ecommerce', name: 'E-Commerce', description: 'Online retail and digital commerce' },
    { id: 'hardware', name: 'Hardware', description: 'Physical product manufacturing and sales' },
    { id: 'software', name: 'Software', description: 'Traditional software licensing model' },
    { id: 'licensing', name: 'Licensing', description: 'Intellectual property and licensing revenue' },
    { id: 'retail', name: 'Retail', description: 'Physical retail and storefront operations' }
  ];

  const metrics = {
    saas: ['MRR', 'ARR', 'CAC', 'LTV', 'Churn Rate', 'ARPU'],
    ecommerce: ['GMV', 'AOV', 'Conversion Rate', 'Customer Acquisition Cost', 'Return Rate'],
    hardware: ['Units Sold', 'COGS', 'Inventory Turnover', 'Gross Margin', 'Production Cost'],
    software: ['License Revenue', 'Maintenance Revenue', 'Implementation Revenue'],
    licensing: ['Royalty Revenue', 'License Fees', 'IP Portfolio Value'],
    retail: ['Sales per Square Foot', 'Inventory Turnover', 'Same-Store Sales']
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'type':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Select Model Type</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {modelTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={cn(
                    "p-4 border rounded-xl text-left transition-colors",
                    selectedType === type.id 
                      ? "border-[#18181B] dark:border-[#E5FFCA] bg-[#E5FFCA]/10" 
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  )}
                >
                  <h4 className="font-medium text-gray-900 dark:text-white">{type.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{type.description}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 'metrics':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Select Key Metrics</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Choose the metrics you want to track in your model</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {metrics[selectedType as keyof typeof metrics]?.map((metric) => (
                <button
                  key={metric}
                  onClick={() => {
                    setSelectedMetrics(prev => 
                      prev.includes(metric) 
                        ? prev.filter(m => m !== metric)
                        : [...prev, metric]
                    );
                  }}
                  className={cn(
                    "p-4 border rounded-xl text-left transition-colors",
                    selectedMetrics.includes(metric)
                      ? "border-[#18181B] dark:border-[#E5FFCA] bg-[#E5FFCA]/10"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">{metric}</span>
                    {selectedMetrics.includes(metric) && (
                      <Check className="w-4 h-4 text-[#18181B] dark:text-[#E5FFCA]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'projections':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Set Projection Timeline</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Define the time period for your financial projections</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Projection Years
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={projectionYears}
                  onChange={(e) => setProjectionYears(Number(e.target.value))}
                  className="w-full accent-[#18181B] dark:accent-[#E5FFCA]"
                />
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span>1 year</span>
                  <span>{projectionYears} years</span>
                  <span>10 years</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Connect Data Sources</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Integrate with your existing tools for real-time data</p>
            <div className="space-y-3">
              {[
                { id: 'quickbooks', name: 'QuickBooks', connected: true },
                { id: 'sheets', name: 'Google Sheets', connected: true },
                { id: 'stripe', name: 'Stripe', connected: false },
                { id: 'salesforce', name: 'Salesforce', connected: false }
              ].map((integration) => (
                <button
                  key={integration.id}
                  onClick={() => {
                    setIntegrations(prev =>
                      prev.includes(integration.id)
                        ? prev.filter(i => i !== integration.id)
                        : [...prev, integration.id]
                    );
                  }}
                  className={cn(
                    "w-full p-4 border rounded-xl text-left transition-colors",
                    integrations.includes(integration.id)
                      ? "border-[#18181B] dark:border-[#E5FFCA] bg-[#E5FFCA]/10"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{integration.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {integration.connected ? 'Connected' : 'Not connected'}
                      </p>
                    </div>
                    {integrations.includes(integration.id) && (
                      <Check className="w-4 h-4 text-[#18181B] dark:text-[#E5FFCA]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Review Model Configuration</h3>
            <div className="space-y-4">
              <div className="bg-[#E5FFCA]/10 rounded-xl p-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Model Type</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {modelTypes.find(t => t.id === selectedType)?.name}
                </p>
              </div>
              <div className="bg-[#E5FFCA]/10 rounded-xl p-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Selected Metrics</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMetrics.map(metric => (
                    <span key={metric} className="px-2 py-1 bg-white dark:bg-[#18181B] rounded-lg text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-[#E5FFCA]/10 rounded-xl p-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Projection Timeline</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{projectionYears} years</p>
              </div>
              <div className="bg-[#E5FFCA]/10 rounded-xl p-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Connected Integrations</h4>
                <div className="flex flex-wrap gap-2">
                  {integrations.map(integration => (
                    <span key={integration} className="px-2 py-1 bg-white dark:bg-[#18181B] rounded-lg text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                      {integration}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Model"
      maxWidth="2xl"
    >
      <div>
        {/* Progress Steps */}
        <div className="flex justify-between mb-8 overflow-x-auto pb-4 -mx-4 px-4 sm:pb-0 sm:mx-0 sm:px-0">
          {steps.map((step, idx) => {
            const StepIcon = step.icon;
            const isActive = currentStep === step.id;
            const isPast = steps.findIndex(s => s.id === currentStep) > idx;

            return (
              <div key={step.id} className="flex flex-col items-center flex-shrink-0">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                  isActive ? "bg-[#18181B] dark:bg-[#E5FFCA] text-white dark:text-[#18181B]" : 
                  isPast ? "bg-[#E5FFCA] text-[#18181B]" : 
                  "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                )}>
                  <StepIcon className="w-5 h-5" />
                </div>
                <span className={cn(
                  "text-sm whitespace-nowrap",
                  isActive ? "text-gray-900 dark:text-white font-medium" : "text-gray-500 dark:text-gray-400"
                )}>
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        {renderStepContent()}

        {/* Footer */}
        <div className={cn(
          "flex justify-between items-center mt-8 pt-4 border-t",
          "border-gray-100 dark:border-gray-800"
        )}>
          <button
            onClick={onClose}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          >
            Cancel
          </button>
          <div className="flex gap-3">
            {currentStep !== 'type' && (
              <Button
                variant="secondary"
                onClick={() => setCurrentStep(steps[steps.findIndex(s => s.id === currentStep) - 1].id as Step)}
                className="bg-white dark:bg-[#27272A] text-gray-900 dark:text-white"
              >
                Back
              </Button>
            )}
            <Button
              onClick={() => {
                const nextIndex = steps.findIndex(s => s.id === currentStep) + 1;
                if (nextIndex < steps.length) {
                  setCurrentStep(steps[nextIndex].id as Step);
                } else {
                  onClose();
                }
              }}
              className="bg-[#18181B] hover:bg-[#27272A] dark:bg-[#E5FFCA] dark:hover:bg-[#E5FFCA]/90 text-white dark:text-[#18181B]"
            >
              {currentStep === 'review' ? 'Create Model' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};