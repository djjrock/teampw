import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../lib/utils';

export const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', query);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search passwords, teams, settings..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            className={cn(
              "w-full pl-10 pr-4 py-2 rounded-lg transition-colors",
              "bg-gray-50 dark:bg-[#0a0a0a] border border-transparent",
              "text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
              "focus:outline-none focus:ring-2 focus:ring-[#E5FFCA]/10",
              "hover:bg-gray-100 dark:hover:bg-[#18181B]"
            )}
          />
        </div>
      </form>

      {isOpen && (
        <div 
          id="search-results"
          className={cn(
            "absolute top-full left-0 right-0 mt-2 rounded-lg overflow-hidden z-50",
            "bg-white dark:bg-[#27272A] border border-gray-200 dark:border-transparent",
            "shadow-lg"
          )}
          role="listbox"
        >
          <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
            No results found
          </div>
        </div>
      )}
    </div>
  );
};