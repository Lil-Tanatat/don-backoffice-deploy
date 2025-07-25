import React, { useState } from "react";
import { PageHeaderActions } from "@/components/PageHeaderActions";
import { CompanyFilters } from "@/components/CompanyFilter";
import companyData from "@/data/companies.json";
import CompanyTable from "@/components/CompanyTable";

export default function CompaniesPage() {
  const [search, setSearch] = useState<string>("");

  type Company = {
    id: number;
    healthZone: number;
    name: string;
    totalEmployees: number;
    male: number;
    female: number;
    bmi: "bad" | "warning" | "good";
    cholesterol: "bad" | "warning" | "good";
    triglyceride: "bad" | "warning" | "good";
    diabetes: "bad" | "warning" | "good";
    bloodPressure: "bad" | "warning" | "good";
    waist: "bad" | "warning" | "good";
    packages?: string;
    projects?: string;
  };

  const companies = companyData as Company[];

  const filteredData = companies.filter((d) =>
    d.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-1 flex-col bg-white px-4 lg:px-12">
      <div className="mt-4 space-y-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
            รายการสถานประกอบการ
          </h1>
          <PageHeaderActions />
        </div>
        <CompanyFilters search={search} setSearch={setSearch} />

        {/* Table Container with Fixed Height */}
        <div className="max-w-full overflow-x-auto">
          <CompanyTable data={filteredData} itemsPerPage={5} />
        </div>
      </div>
    </div>
  );
}
