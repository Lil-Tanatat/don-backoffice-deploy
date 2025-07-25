import { create } from "zustand";

interface EmployeeFilterState {
  keyword: string;
  selectedEmployeeId: string | null;
  selectedHealthReportId: string | null;
  setKeyword: (k: string) => void;
  setSelectedEmployeeId: (id: string | null) => void;
  setSelectedHealthReportId: (id: string | null) => void;
  clearFilters: () => void;
}

export const useEmployeeStore = create<EmployeeFilterState>((set) => ({
  keyword: "",
  selectedEmployeeId: null,
  selectedHealthReportId: null,
  setKeyword: (k) => set({ keyword: k }),
  setSelectedEmployeeId: (id) => set({ selectedEmployeeId: id }),
  setSelectedHealthReportId: (id) => set({ selectedHealthReportId: id }),
  clearFilters: () =>
    set({
      keyword: "",
      selectedEmployeeId: null,
      selectedHealthReportId: null,
    }),
}));
