import React, { useRef, useEffect } from 'react';
import { Search, ArrowUp, ArrowDown } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onNextMatch: () => void;
  onPrevMatch: () => void;
  currentMatch: number;
  totalMatches: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onNextMatch,
  onPrevMatch,
  currentMatch,
  totalMatches
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus on input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="sticky top-4 z-10 bg-white shadow-lg rounded-lg p-3 transition-all duration-300 border border-gray-200">
      <div className="flex items-center">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search in content..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm"
          />
        </div>
        
        <div className="flex ml-2 items-center">
          <span className={`text-sm mr-2 ${searchTerm ? 'text-gray-700' : 'text-gray-400'}`}>
            {searchTerm && totalMatches > 0 
              ? `${currentMatch} of ${totalMatches}`
              : totalMatches === 0 && searchTerm 
                ? 'No matches'
                : ''}
          </span>
          
          <button
            onClick={onPrevMatch}
            disabled={!searchTerm || totalMatches === 0}
            className={`p-2 rounded-l-md border border-r-0 border-gray-300 ${
              !searchTerm || totalMatches === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-indigo-600 hover:bg-indigo-50 transition-colors'
            }`}
            aria-label="Previous match"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
          
          <button
            onClick={onNextMatch}
            disabled={!searchTerm || totalMatches === 0}
            className={`p-2 rounded-r-md border border-gray-300 ${
              !searchTerm || totalMatches === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-indigo-600 hover:bg-indigo-50 transition-colors'
            }`}
            aria-label="Next match"
          >
            <ArrowDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {searchTerm && (
        <div className="mt-2 text-xs text-gray-500">
          <span>Press <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded-md shadow-sm">↑</kbd> for previous, <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded-md shadow-sm">↓</kbd> or <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded-md shadow-sm">Enter</kbd> for next match</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;