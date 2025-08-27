import React from 'react';

interface FilterOption {
  id: string;
  label: string;
  icon: string;
}

interface FilterDropdownProps {
  options: FilterOption[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  getAllCount: () => number;
  getFilterCount: (filterId: string) => number;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options,
  selectedFilter,
  onFilterChange,
  getAllCount,
  getFilterCount
}) => {
  return (
    <div className="relative">
      <select
        value={selectedFilter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="px-3 py-1.5 pr-8 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent cursor-pointer appearance-none"
      >
        <option value="all">
          All Categories ({getAllCount()})
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.icon} {option.label} ({getFilterCount(option.id)})
          </option>
        ))}
      </select>
      
      {/* Custom dropdown arrow */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg className="h-3 w-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default FilterDropdown;
