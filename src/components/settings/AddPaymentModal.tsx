import React from 'react';
import { Button } from '../ui/Button';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Modal } from '../ui/Modal';

interface AddPaymentModalProps {
  type: 'card' | 'ach';
  onClose: () => void;
}

export const AddPaymentModal: React.FC<AddPaymentModalProps> = ({ type, onClose }) => {
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={`Add ${type === 'card' ? 'Credit Card' : 'Bank Account'}`}
      maxWidth="md"
    >
      <div className="space-y-4">
        {type === 'card' ? (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 1234 1234 1234"
                className={cn(
                  "w-full px-3 py-2 border rounded-lg transition-colors",
                  "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                  "text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
                  "focus:ring-2 focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10"
                )}
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg transition-colors",
                    "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                    "text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
                    "focus:ring-2 focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10"
                  )}
                  maxLength={5}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  CVC
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg transition-colors",
                    "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                    "text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
                    "focus:ring-2 focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10"
                  )}
                  maxLength={4}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Bank Name
              </label>
              <input
                type="text"
                placeholder="Enter your bank name"
                className={cn(
                  "w-full px-3 py-2 border rounded-lg transition-colors",
                  "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                  "text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
                  "focus:ring-2 focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10"
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Account Type
              </label>
              <select className={cn(
                "w-full px-3 py-2 border rounded-lg transition-colors appearance-none",
                "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                "text-gray-900 dark:text-white",
                "focus:ring-2 focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10"
              )}>
                <option value="checking">Checking</option>
                <option value="savings">Savings</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Routing Number
              </label>
              <input
                type="text"
                placeholder="123456789"
                className={cn(
                  "w-full px-3 py-2 border rounded-lg transition-colors",
                  "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                  "text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
                  "focus:ring-2 focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10"
                )}
                maxLength={9}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Account Number
              </label>
              <input
                type="text"
                placeholder="Enter your account number"
                className={cn(
                  "w-full px-3 py-2 border rounded-lg transition-colors",
                  "bg-white dark:bg-[#0a0a0a] border-gray-200 dark:border-transparent",
                  "text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
                  "focus:ring-2 focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10"
                )}
              />
            </div>
          </>
        )}

        <div className={cn(
          "p-4 rounded-lg flex items-start gap-3",
          "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/50"
        )}>
          <AlertCircle className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700 dark:text-blue-300">
            <p className="font-medium mb-1">Secure Payment Processing</p>
            <p>Your payment information is encrypted and secure. We never store your full {type === 'card' ? 'card' : 'bank account'} details.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-4 border-t dark:border-[#323232]">
          <input
            type="checkbox"
            id="setDefault"
            className={cn(
              "rounded border-gray-200 dark:border-transparent",
              "text-[#18181B] dark:text-[#E5FFCA]",
              "focus:ring-[#E5FFCA]/10 dark:focus:ring-[#E5FFCA]/10"
            )}
          />
          <label htmlFor="setDefault" className="text-sm text-gray-700 dark:text-gray-200">
            Set as default payment method
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <Button 
            variant="secondary"
            onClick={onClose}
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
            Add {type === 'card' ? 'Card' : 'Bank Account'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};