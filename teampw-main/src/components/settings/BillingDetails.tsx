import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  CreditCard, Check, Star, Plus, Calendar, Receipt, 
  Building, History, ArrowRight, FileText, Download,
  AlertCircle, Wallet, ChevronLeft
} from 'lucide-react';
import { AddPaymentModal } from './AddPaymentModal';
import { cn } from '../../lib/utils';

interface PaymentMethod {
  id: string;
  type: 'card' | 'ach';
  last4: string;
  expiryDate?: string;
  isDefault: boolean;
  bankName?: string;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  downloadUrl: string;
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    last4: '4242',
    expiryDate: '12/24',
    isDefault: true
  },
  {
    id: '2',
    type: 'ach',
    last4: '1234',
    bankName: 'Chase Bank',
    isDefault: false
  }
];

const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    date: '2024-03-01',
    amount: 29.99,
    status: 'paid',
    downloadUrl: '#'
  },
  {
    id: 'INV-002',
    date: '2024-02-01',
    amount: 29.99,
    status: 'paid',
    downloadUrl: '#'
  }
];

export const BillingDetails: React.FC = () => {
  const navigate = useNavigate();
  const [showAddPaymentModal, setShowAddPaymentModal] = useState<'card' | 'ach' | null>(null);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/settings')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-[#323232] rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-500 dark:text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing & Plans</h1>
      </div>

      <div className="grid gap-6">
        <Card className={cn(
          "p-6",
          "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent"
        )}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F4F4F5] dark:bg-[#0a0a0a] rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-[#18181B] dark:text-gray-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Current Plan</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Free Plan</p>
              </div>
            </div>
            <Button className={cn(
              "bg-[#18181B] hover:bg-[#27272A]",
              "dark:bg-[#E5FFCA] dark:hover:bg-[#E5FFCA]/90",
              "text-white dark:text-[#18181B]"
            )}>
              Upgrade Plan
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className={cn(
              "p-4 rounded-lg",
              "bg-gray-50 dark:bg-[#0a0a0a]"
            )}>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Team Members</div>
              <div className="text-2xl font-semibold text-gray-900 dark:text-white">3/5</div>
            </div>
            <div className={cn(
              "p-4 rounded-lg",
              "bg-gray-50 dark:bg-[#0a0a0a]"
            )}>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Passwords</div>
              <div className="text-2xl font-semibold text-gray-900 dark:text-white">25/50</div>
            </div>
            <div className={cn(
              "p-4 rounded-lg",
              "bg-gray-50 dark:bg-[#0a0a0a]"
            )}>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Storage</div>
              <div className="text-2xl font-semibold text-gray-900 dark:text-white">1/5 GB</div>
            </div>
          </div>
        </Card>

        <Card className={cn(
          "p-6",
          "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent"
        )}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F4F4F5] dark:bg-[#0a0a0a] rounded-full flex items-center justify-center">
                <Wallet className="w-5 h-5 text-[#18181B] dark:text-gray-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Methods</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your payment methods</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="secondary"
                onClick={() => setShowAddPaymentModal('ach')}
                className={cn(
                  "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent",
                  "hover:bg-gray-50 dark:hover:bg-[#323232] text-gray-900 dark:text-white"
                )}
              >
                <Building className="w-4 h-4 mr-2" />
                Add Bank Account
              </Button>
              <Button 
                className={cn(
                  "bg-[#18181B] hover:bg-[#27272A]",
                  "dark:bg-[#E5FFCA] dark:hover:bg-[#E5FFCA]/90",
                  "text-white dark:text-[#18181B]"
                )}
                onClick={() => setShowAddPaymentModal('card')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Card
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {mockPaymentMethods.map((method) => (
              <div 
                key={method.id}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg",
                  "bg-gray-50 dark:bg-[#0a0a0a]"
                )}
              >
                <div className="flex items-center gap-3">
                  {method.type === 'card' ? (
                    <CreditCard className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <Building className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  )}
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {method.type === 'card' ? (
                        <>Card ending in {method.last4}</>
                      ) : (
                        <>{method.bankName} ending in {method.last4}</>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {method.type === 'card' ? (
                        <>Expires {method.expiryDate}</>
                      ) : (
                        'Bank Account (ACH)'
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {method.isDefault && (
                    <span className="px-2 py-1 bg-[#E5FFCA] text-[#18181B] text-xs font-medium rounded-full">
                      Default
                    </span>
                  )}
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className={cn(
          "p-6",
          "bg-white dark:bg-[#27272A] border-gray-200 dark:border-transparent"
        )}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F4F4F5] dark:bg-[#0a0a0a] rounded-full flex items-center justify-center">
                <Receipt className="w-5 h-5 text-[#18181B] dark:text-gray-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Billing History</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">View and download past invoices</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {mockInvoices.map((invoice) => (
              <div 
                key={invoice.id}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg",
                  "bg-gray-50 dark:bg-[#0a0a0a]"
                )}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Invoice #{invoice.id}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(invoice.date).toLocaleDateString()} · ${invoice.amount}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "text-gray-600 dark:text-gray-400",
                    "hover:bg-gray-100 dark:hover:bg-[#323232]"
                  )}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {showAddPaymentModal && (
          <AddPaymentModal
            type={showAddPaymentModal}
            onClose={() => setShowAddPaymentModal(null)}
          />
        )}
      </div>
    </div>
  );
};