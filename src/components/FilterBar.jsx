import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
export default function FilterBar({ searchQuery, onSearchChange, sortBy, onSortChange }) {
    return (
      <div className="mb-8 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search favorites..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-gray-300 focus:ring-0 placeholder-gray-400 text-gray-900"
          />
          <MagnifyingGlassIcon className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
        </div>
  
        {/* Sort Controls */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-500">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-100 border-0 text-gray-900 focus:ring-2 focus:ring-blue-500"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    );
  }