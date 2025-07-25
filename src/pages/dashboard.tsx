import React from "react";
import { SectionCards } from "@/components/section-cards";
import {
  DashboardHeader,
  DashboardFilters,
  DashboardContent,
} from "@/components/dashboard";
import { useDashboardFilters } from "@/hooks/useDashboardFilters";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function Dashboard() {
  const { filters, updateFilter, getFilterOptions } = useDashboardFilters();
  const { data, isLoading, error } = useDashboardData(filters);

  return (
    <div className="flex flex-1 flex-col bg-white px-4 lg:px-12">
      <div className="mt-4">
        <DashboardHeader />
      </div>

      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* Dashboard Filters */}
          <DashboardFilters
            filters={filters}
            onFilterChange={updateFilter}
            getFilterOptions={getFilterOptions}
          />

          {/* Stats Cards */}
          <SectionCards />

          {/* Main Content */}
          <DashboardContent data={data} isLoading={isLoading} error={error} />
        </div>
      </div>
    </div>
  );
}
