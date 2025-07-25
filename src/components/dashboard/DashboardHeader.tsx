import React from 'react';

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title = 'Dashboard สรุปภาพรวม',
  subtitle,
}) => {
  return (
    <div className="mb-4">
      <h2 className="text-3xl font-semibold text-[#09090B]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 mt-2">{subtitle}</p>
      )}
    </div>
  );
}; 