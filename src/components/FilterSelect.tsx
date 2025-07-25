import React from 'react';
import { FilterOption } from '@/types/dashboard';

interface FilterSelectProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder,
  className = '',
}) => {
  return (
    <div className={`flex flex-col text-sm ${className}`}>
      <label className="mb-1 text-base font-semibold">{label}</label>
      <select
        className="w-full px-2 py-2 border rounded-md text-sm font-medium text-[#18181B] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder || `เลือก${label}`}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}; 