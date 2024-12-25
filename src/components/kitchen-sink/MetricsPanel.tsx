import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUp, TrendingDown, DollarSign, Users, CreditCard, Building } from 'lucide-react';

interface MetricCardProps {
  icon: React.ElementType;
  name: string;
  value: string;
  change: string;
  positive: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  name,
  value,
  change,
  positive,
  isActive,
  onClick
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left transition-colors ${
      isActive
        ? 'bg-[#E5FFCA]/10 border-[#18181B]'
        : 'hover:bg-gray-50 border-transparent'
    } border rounded-xl p-4`}
  >
    <div className="flex items-start gap-4">
      <div className="p-2 rounded-lg bg-gray-100">
        <Icon className="w-4 h-4 text-gray-600" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600">{name}</p>
        <p className="text-lg font-semibold text-gray-900 mt-1">{value}</p>
        <div className="flex items-center mt-1">
          {positive ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm ml-1 ${
            positive ? 'text-green-600' : 'text-red-600'
          }`}>
            {change}
          </span>
        </div>
      </div>
    </div>
  </button>
);

export const MetricsPanel: React.FC = () => {
  const [activeMetric, setActiveMetric] = React.useState('revenue');

  const metrics = [
    {
      id: 'revenue',
      name: 'Revenue',
      icon: DollarSign,
      value: '$534,885,800',
      change: '+66%',
      positive: true
    },
    {
      id: 'customers',
      name: 'Customers',
      icon: Users,
      value: '34,286',
      change: '+129%',
      positive: true
    },
    {
      id: 'arpu',
      name: 'ARPU',
      icon: CreditCard,
      value: '$513.88',
      change: '-12%',
      positive: false
    },
    {
      id: 'opex',
      name: 'Operating Expenses',
      icon: Building,
      value: '$24,420,060',
      change: '+76%',
      positive: false
    }
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Key Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            icon={metric.icon}
            name={metric.name}
            value={metric.value}
            change={metric.change}
            positive={metric.positive}
            isActive={activeMetric === metric.id}
            onClick={() => setActiveMetric(metric.id)}
          />
        ))}
      </div>
    </Card>
  );
};