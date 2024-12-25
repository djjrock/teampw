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
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Plans</h1>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F4F4F5] rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-[#18181B]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>
                <p className="text-sm text-gray-500">Free Plan</p>
              </div>
            </div>
            <Button className="bg-[#18181B] hover:bg-[#27272A] text-white">
              Upgrade Plan
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Team Members</div>
              <div className="text-2xl font-semibold text-gray-900">3/5</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Passwords</div>
              <div className="text-2xl font-semibold text-gray-900">25/50</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Storage</div>
              <div className="text-2xl font-semibold text-gray-900">1/5 GB</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F4F4F5] rounded-full flex items-center justify-center">
                <Wallet className="w-5 h-5 text-[#18181B]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
                <p className="text-sm text-gray-500">Manage your payment methods</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="secondary"
                onClick={() => setShowAddPaymentModal('ach')}
              >
                <Building className="w-4 h-4 mr-2" />
                Add Bank Account
              </Button>
              <Button 
                className="bg-[#18181B] hover:bg-[#27272A] text-white"
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
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {method.type === 'card' ? (
                    <CreditCard className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Building className="w-5 h-5 text-gray-500" />
                  )}
                  <div>
                    <div className="font-medium text-gray-900">
                      {method.type === 'card' ? (
                        <>Card ending in {method.last4}</>
                      ) : (
                        <>{method.bankName} ending in {method.last4}</>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
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
                  <button className="text-gray-400 hover:text-gray-600">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F4F4F5] rounded-full flex items-center justify-center">
                <Receipt className="w-5 h-5 text-[#18181B]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Billing History</h2>
                <p className="text-sm text-gray-500">View and download past invoices</p>
              </div>
            </div>
            <Button variant="secondary">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Invoice</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Download</th>
                </tr>
              </thead>
              <tbody>
                {mockInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-gray-900">{invoice.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-500">
                        {new Date(invoice.date).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-900">
                        ${invoice.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        invoice.status === 'paid'
                          ? 'bg-[#E5FFCA] text-[#18181B]'
                          : invoice.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {showAddPaymentModal && (
        <AddPaymentModal
          type={showAddPaymentModal}
          onClose={() => setShowAddPaymentModal(null)}
        />
      )}
    </div>
  );
};