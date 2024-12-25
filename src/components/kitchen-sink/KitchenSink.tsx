import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Toggle } from '../ui/Toggle';
import { ChevronLeft } from 'lucide-react';
import { Steps } from './Steps';
import { ModelCreationModal } from './ModelCreationModal';
import { MetricsPanel } from './MetricsPanel';
import { ProfileCard } from './ProfileCard';
import { SkeletonLoader } from './SkeletonLoader';

export const KitchenSink: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [toggleState, setToggleState] = useState(false);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/settings')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Kitchen Sink</h1>
      </div>

      <div className="space-y-12">
        {/* Colors */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">Colors</h2>
          <Card className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="h-20 bg-[#18181B] rounded-lg mb-2" />
                <p className="text-sm font-medium">Primary</p>
                <p className="text-xs text-gray-500">#18181B</p>
              </div>
              <div>
                <div className="h-20 bg-[#E5FFCA] rounded-lg mb-2" />
                <p className="text-sm font-medium">Accent</p>
                <p className="text-xs text-gray-500">#E5FFCA</p>
              </div>
              <div>
                <div className="h-20 bg-gray-100 rounded-lg mb-2" />
                <p className="text-sm font-medium">Background</p>
                <p className="text-xs text-gray-500">#F4F4F5</p>
              </div>
              <div>
                <div className="h-20 bg-white border border-gray-200 rounded-lg mb-2" />
                <p className="text-sm font-medium">Surface</p>
                <p className="text-xs text-gray-500">#FFFFFF</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">Typography</h2>
          <Card className="p-6 space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Heading 1</h1>
              <p className="text-sm text-gray-500">4xl / Bold / Gray 900</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Heading 2</h2>
              <p className="text-sm text-gray-500">2xl / Bold / Gray 900</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Heading 3</h3>
              <p className="text-sm text-gray-500">lg / Semibold / Gray 900</p>
            </div>
            <div>
              <p className="text-base text-gray-600 mb-2">Body Text</p>
              <p className="text-sm text-gray-500">base / Regular / Gray 600</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Small Text</p>
              <p className="text-sm text-gray-500">sm / Regular / Gray 500</p>
            </div>
          </Card>
        </section>

        {/* Buttons */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">Buttons</h2>
          <Card className="p-6">
            <div className="flex flex-wrap gap-4">
              <Button>Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button size="sm">Small Button</Button>
              <Button variant="ghost" className="text-red-600 hover:bg-red-50">
                Delete
              </Button>
            </div>
          </Card>
        </section>

        {/* Toggle */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">Toggle</h2>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <Toggle checked={toggleState} onChange={setToggleState} />
              <span className="text-sm text-gray-600">
                {toggleState ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </Card>
        </section>

        {/* Steps */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">Steps</h2>
          <Steps />
        </section>

        {/* Modal */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">Modal</h2>
          <Card className="p-6">
            <Button onClick={() => setShowModal(true)}>Open Modal</Button>
            {showModal && <ModelCreationModal isOpen={showModal} onClose={() => setShowModal(false)} />}
          </Card>
        </section>

        {/* Metrics Panel */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">Metrics Panel</h2>
          <MetricsPanel />
        </section>

        {/* Profile Card */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">Profile Card</h2>
          <ProfileCard
            name="Sarah Wilson"
            title="Senior Product Designer"
            department="Design"
            email="sarah@company.com"
            phone="+1 (555) 123-4567"
            location="San Francisco, CA"
            imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
        </section>

        {/* Skeleton Loader */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">Skeleton Loader</h2>
          <SkeletonLoader />
        </section>
      </div>
    </div>
  );
};