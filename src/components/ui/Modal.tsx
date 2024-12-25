import React, { useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
  showClose?: boolean;
  className?: string;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  'full': 'max-w-full'
};

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  description,
  maxWidth = 'md',
  showClose = true,
  className
}: ModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 overflow-y-auto">
        {/* Container to center the panel */}
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel
            className={cn(
              'w-full transform rounded-2xl bg-white dark:bg-[#27272A] shadow-xl',
              'border border-gray-200 dark:border-transparent',
              'transition-all',
              'animate-in fade-in zoom-in-95 duration-200',
              maxWidthClasses[maxWidth],
              className
            )}
          >
            {/* Modal header */}
            {(title || showClose) && (
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  {title && (
                    <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                      {title}
                    </Dialog.Title>
                  )}
                  {description && (
                    <Dialog.Description className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {description}
                    </Dialog.Description>
                  )}
                </div>
                {showClose && (
                  <button
                    onClick={onClose}
                    className={cn(
                      'p-2 rounded-lg transition-colors',
                      'hover:bg-gray-100 dark:hover:bg-[#323232]'
                    )}
                  >
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                )}
              </div>
            )}

            {/* Modal content */}
            <div className="p-4 sm:p-6">
              {children}
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
} 