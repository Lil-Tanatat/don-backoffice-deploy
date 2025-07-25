import React from 'react';
import { FilterSelect } from '@/components/FilterSelect';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import { DashboardFilters as DashboardFiltersType } from '@/types/dashboard';

interface DashboardFiltersProps {
  filters: DashboardFiltersType;
  onFilterChange: (filterKey: keyof DashboardFiltersType, value: string) => void;
  getFilterOptions: (filterKey: keyof DashboardFiltersType) => { label: string; value: string }[];
}

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  filters,
  onFilterChange,
  getFilterOptions,
}) => {
  const filterConfigs = [
    { key: 'region' as keyof DashboardFiltersType, label: 'ภูมิภาค' },
    { key: 'center' as keyof DashboardFiltersType, label: 'ศูนย์อนามัย' },
    { key: 'province' as keyof DashboardFiltersType, label: 'จังหวัด' },
    { key: 'district' as keyof DashboardFiltersType, label: 'อำเภอ' },
    { key: 'subDistrict' as keyof DashboardFiltersType, label: 'ตำบล' },
    { key: 'monthYear' as keyof DashboardFiltersType, label: 'เดือนปี' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      {filterConfigs.map(({ key, label }) => (
        <FilterSelect
          key={key}
          label={label}
          value={filters[key]}
          options={getFilterOptions(key)}
          onChange={(value) => onFilterChange(key, value)}
        />
      ))}
    </div>
  );
}; 