import React from "react";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { DashboardData } from "@/types/dashboard";

interface DashboardContentProps {
  data: DashboardData[];
  isLoading?: boolean;
  error?: string | null;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({
  data,
  isLoading = false,
  error = null,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="px-4 lg:px-6">
          <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>
        </div>
        <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">เกิดข้อผิดพลาด: {error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <div className="px-4 lg:px-6">
        <DataTable data={data} />
      </div>
    </div>
  );
};
