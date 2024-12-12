import React from 'react';
import { Card } from '../ui/Card';

export const SkeletonLoader: React.FC = () => {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
        <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="h-24 w-full bg-gray-200 rounded animate-pulse" />
      </div>
    </Card>
  );
};