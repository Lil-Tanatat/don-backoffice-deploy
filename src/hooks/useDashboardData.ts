import { useState, useEffect } from 'react';
import { DashboardData, DashboardFilters } from '@/types/dashboard';

interface UseDashboardDataResult {
  data: DashboardData[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useDashboardData = (filters?: DashboardFilters): UseDashboardDataResult => {
  const [data, setData] = useState<DashboardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // For now, we'll simulate API call with static data
      // In a real app, this would be an actual API call with filters
      const response = await import('@/data/dashboard.json');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setData(response.default);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]); // Refetch when filters change

  const refetch = () => {
    fetchData();
  };

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}; 