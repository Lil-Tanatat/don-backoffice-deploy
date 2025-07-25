import { useState, useCallback } from 'react';
import { DashboardFilters, FilterOption } from '@/types/dashboard';

const initialFilters: DashboardFilters = {
  region: '',
  center: '',
  province: '',
  district: '',
  subDistrict: '',
  monthYear: '',
};

// Static filter options - these could be fetched from APIs in the future
const filterOptions = {
  region: [
    { label: 'เหนือ', value: 'north' },
    { label: 'กลาง', value: 'central' },
    { label: 'อีสาน', value: 'northeast' },
    { label: 'ใต้', value: 'south' },
  ],
  center: [
    { label: 'ศูนย์เขตสุขภาพ 1', value: 'center1' },
    { label: 'ศูนย์เขตสุขภาพ 2', value: 'center2' },
  ],
  province: [
    { label: 'กรุงเทพ', value: 'bangkok' },
    { label: 'เชียงใหม่', value: 'chiangmai' },
    { label: 'ขอนแก่น', value: 'khonkaen' },
  ],
  district: [
    { label: 'เมือง', value: 'mueang' },
    { label: 'สารภี', value: 'saraphi' },
    { label: 'จอมทอง', value: 'chomthong' },
  ],
  subDistrict: [
    { label: 'ช้างเผือก', value: 'changphueak' },
    { label: 'สุเทพ', value: 'suthep' },
    { label: 'หางดง', value: 'hangdong' },
  ],
  monthYear: [
    { label: 'มกราคม', value: '01' },
    { label: 'กุมภาพันธ์', value: '02' },
    { label: 'มีนาคม', value: '03' },
    { label: 'เมษายน', value: '04' },
    { label: 'พฤษภาคม', value: '05' },
    { label: 'มิถุนายน', value: '06' },
    { label: 'กรกฏาคม', value: '07' },
    { label: 'สิงหาคม', value: '08' },
    { label: 'กันยายน', value: '09' },
    { label: 'ตุลาคม', value: '10' },
    { label: 'พฤศจิกายน', value: '11' },
    { label: 'ธันวาคม', value: '12' },
  ],
};

export const useDashboardFilters = () => {
  const [filters, setFilters] = useState<DashboardFilters>(initialFilters);

  const updateFilter = useCallback((filterKey: keyof DashboardFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const getFilterOptions = useCallback((filterKey: keyof DashboardFilters): FilterOption[] => {
    return filterOptions[filterKey] || [];
  }, []);

  return {
    filters,
    updateFilter,
    resetFilters,
    getFilterOptions,
  };
}; 