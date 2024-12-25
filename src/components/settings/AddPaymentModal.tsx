import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { X, CreditCard, Building, AlertCircle } from 'lucide-react';

interface AddPaymentModalProps {
  type: 'card' | 'ach';
  onClose: () => void;
}

export const AddPaymentModal: React.FC<AddPaymentModalProps> = ({ type, onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment method addition
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              {type === 'card' ? (
                <CreditCard className="w-5 h-5 text-gray-800" />
              ) : (
                <Building className="w-5 h-5 text-gray-800" />
              )}
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Add {type === 'card' ? 'Credit Card' : 'Bank Account'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {type === 'card' ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-transparent transition-shadow"
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-transparent transition-shadow"
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-transparent transition-shadow"
                    maxLength={4}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Bank Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your bank name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-transparent transition-shadow"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Account Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-transparent transition-shadow">
                  <option value="checking">Checking</option>
                  <option value="savings">Savings</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Routing Number
                </label>
                <input
                  type="text"
                  placeholder="123456789"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-transparent transition-shadow"
                  maxLength={9}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Account Number
                </label>
                <input
                  type="text"
                  placeholder="Enter your account number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900/10 focus:border-transparent transition-shadow"
                />
              </div>
            </>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">Secure Payment Processing</p>
              <p>Your payment information is encrypted and secure. We never store your full {type === 'card' ? 'card' : 'bank account'} details.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-4 border-t">
            <input
              type="checkbox"
              id="setDefault"
              className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
            />
            <label htmlFor="setDefault" className="text-sm text-gray-700">
              Set as default payment method
            </label>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#101827] hover:bg-gray-800">
              Add {type === 'card' ? 'Card' : 'Bank Account'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};