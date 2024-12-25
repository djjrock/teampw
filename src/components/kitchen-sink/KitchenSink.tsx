import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Toggle } from '../ui/Toggle';
import { ChevronLeft, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ModelCreationModal } from './ModelCreationModal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={cn(
        "relative w-full max-w-lg p-6 rounded-2xl shadow-xl",
        "bg-white dark:bg-[#27272A] border border-gray-200 dark:border-gray-800",
        "transform transition-all",
        "animate-in fade-in zoom-in-95 duration-200"
      )}>
        {children}
        <button
          onClick={onClose}
          className={cn(
            "absolute top-4 right-4 p-2 rounded-lg transition-colors",
            "text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400",
            "hover:bg-gray-100 dark:hover:bg-[#323232]"
          )}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const KitchenSink: React.FC = () => {
  const navigate = useNavigate();
  const [toggleState, setToggleState] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/settings')}
          className={cn(
            "p-2 rounded-lg transition-colors",
            "hover:bg-gray-100 dark:hover:bg-[#323232]"
          )}
        >
          <ChevronLeft className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Kitchen Sink</h1>
      </div>

      <div className="space-y-12">
        {/* Modal Section */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Modals</h2>
          <Card className={cn(
            "p-6",
            "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent"
          )}>
            <div className="flex gap-4">
              <Button 
                onClick={() => setIsModalOpen(true)}
                className={cn(
                  "bg-[#18181B] hover:bg-[#27272A]",
                  "dark:bg-[#E5FFCA] dark:hover:bg-[#E5FFCA]/90",
                  "text-white dark:text-[#18181B]"
                )}
              >
                Simple Modal
              </Button>

              <Button 
                onClick={() => setIsWizardOpen(true)}
                className={cn(
                  "bg-[#18181B] hover:bg-[#27272A]",
                  "dark:bg-[#E5FFCA] dark:hover:bg-[#E5FFCA]/90",
                  "text-white dark:text-[#18181B]"
                )}
              >
                Multi-step Wizard
              </Button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Beautiful Modal
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  This is a beautiful modal with a backdrop blur effect and smooth animations.
                  It's perfect for displaying important information or collecting user input.
                </p>
                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    variant="ghost"
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#323232]"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-[#18181B] hover:bg-[#27272A] dark:bg-[#E5FFCA] dark:hover:bg-[#E5FFCA]/90 text-white dark:text-[#18181B]"
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </Modal>

            <ModelCreationModal 
              isOpen={isWizardOpen} 
              onClose={() => setIsWizardOpen(false)} 
            />
          </Card>
        </section>

        {/* Colors */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Colors</h2>
          <Card className={cn(
            "p-6",
            "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent"
          )}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="h-20 bg-[#18181B] dark:bg-[#0a0a0a] rounded-lg mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Primary</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">#18181B</p>
              </div>
              <div>
                <div className="h-20 bg-[#E5FFCA] rounded-lg mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Accent</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">#E5FFCA</p>
              </div>
              <div>
                <div className="h-20 bg-gray-100 dark:bg-[#27272A] rounded-lg mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Background</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">#F4F4F5</p>
              </div>
              <div>
                <div className="h-20 bg-white dark:bg-[#18181B] border border-gray-200 dark:border-gray-800 rounded-lg mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Surface</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">#FFFFFF</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Typography</h2>
          <Card className={cn(
            "p-6 space-y-6",
            "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent"
          )}>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Heading 1</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">4xl / Bold / Gray 900</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Heading 2</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">2xl / Bold / Gray 900</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Heading 3</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">lg / Semibold / Gray 900</p>
            </div>
            <div>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-2">Body Text</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">base / Regular / Gray 600</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Small Text</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">sm / Regular / Gray 500</p>
            </div>
          </Card>
        </section>

        {/* Buttons */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Buttons</h2>
          <Card className={cn(
            "p-6",
            "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent"
          )}>
            <div className="flex flex-wrap gap-4">
              <Button className={cn(
                "bg-[#18181B] hover:bg-[#27272A]",
                "dark:bg-[#E5FFCA] dark:hover:bg-[#E5FFCA]/90",
                "text-white dark:text-[#18181B]"
              )}>
                Primary Button
              </Button>
              <Button 
                variant="secondary"
                className={cn(
                  "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent",
                  "hover:bg-gray-50 dark:hover:bg-[#323232] text-gray-900 dark:text-white"
                )}
              >
                Secondary Button
              </Button>
              <Button 
                variant="ghost"
                className={cn(
                  "text-gray-600 dark:text-gray-200",
                  "hover:bg-gray-100 dark:hover:bg-[#323232]",
                  "hover:text-gray-900 dark:hover:text-white"
                )}
              >
                Ghost Button
              </Button>
              <Button 
                size="sm"
                className={cn(
                  "bg-[#18181B] hover:bg-[#27272A]",
                  "dark:bg-[#E5FFCA] dark:hover:bg-[#E5FFCA]/90",
                  "text-white dark:text-[#18181B]"
                )}
              >
                Small Button
              </Button>
              <Button 
                variant="ghost" 
                className={cn(
                  "text-red-600 dark:text-red-500",
                  "hover:bg-red-50 dark:hover:bg-red-900/10"
                )}
              >
                Delete
              </Button>
            </div>
          </Card>
        </section>

        {/* Form Controls */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Form Controls</h2>
          <Card className={cn(
            "p-6 space-y-6",
            "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent"
          )}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Text Input</label>
              <input
                type="text"
                placeholder="Enter text..."
                className={cn(
                  "w-full px-3 py-2 rounded-lg border transition-colors",
                  "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                  "text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
                  "focus:outline-none focus:ring-2 focus:ring-[#E5FFCA]/10"
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Select</label>
              <select className={cn(
                "w-full px-3 py-2 rounded-lg border transition-colors appearance-none",
                "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                "text-gray-900 dark:text-white",
                "focus:outline-none focus:ring-2 focus:ring-[#E5FFCA]/10"
              )}>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Toggle</label>
              <div className="flex items-center gap-2">
                <Toggle checked={toggleState} onChange={setToggleState} />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {toggleState ? 'On' : 'Off'}
                </span>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};