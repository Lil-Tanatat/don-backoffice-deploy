import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
}

function getVisiblePages(current: number, total: number): (number | string)[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | string)[] = [];
  if (current > 3) pages.push(1);
  if (current > 4) pages.push("...");
  for (
    let i = Math.max(1, current - 2);
    i <= Math.min(total, current + 2);
    i++
  ) {
    pages.push(i);
  }
  if (current < total - 3) pages.push("...");
  if (current < total - 2) pages.push(total);
  return pages;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 30, 40, 50],
}) => {
  const totalPages = Math.ceil(total / pageSize) || 1;
  const startIndex = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const endIndex = Math.min(page * pageSize, total);
  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 sm:mt-4 px-2 sm:px-4 py-2 sm:py-3 bg-white gap-3 sm:gap-0">
      {/* Desktop: Left side - Data range only */}
      <div className="hidden sm:flex items-center">
        <span className="text-sm text-[#18181B] font-medium">
          {total > 0
            ? `${startIndex}-${endIndex} จาก ${total} รายการ`
            : "0 จาก 0 รายการ"}
        </span>
      </div>

      {/* Mobile: Top row - Data range and Items per page */}
      <div className="flex sm:hidden justify-between items-center w-full order-1">
        {/* Left side - Data range */}
        <div className="flex items-center">
          <span className="text-sm text-[#18181B] font-medium text-xs">
            {total > 0
              ? `${startIndex}-${endIndex} จาก ${total} รายการ`
              : "0 จาก 0 รายการ"}
          </span>
        </div>

        {/* Items per page dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-[#18181B] font-medium text-xs">แสดง</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger className="w-16 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((n) => (
                <SelectItem key={n} value={n.toString()}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desktop & Mobile: Right side - Controls */}
      <div className="flex flex-col sm:flex-row items-center sm:gap-4 w-full sm:w-auto order-2">
        {/* Desktop: Items per page dropdown */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[#18181B] font-medium">แสดง</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger className="w-20 h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((n) => (
                <SelectItem key={n} value={n.toString()}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center justify-center w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-1 sm:gap-2 text-[#18181B] font-medium text-xs sm:text-sm">
              <ChevronLeft size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">ก่อนหน้า</span>
            </div>
          </Button>

          <div className="flex items-center mx-1 sm:mx-2 overflow-x-auto max-w-[200px] sm:max-w-none">
            {visiblePages.map((p, idx) =>
              p === "..." ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-1 sm:px-2 py-1 text-gray-500 text-xs sm:text-sm"
                >
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => onPageChange(p as number)}
                  className={`px-2 sm:px-3 py-1 rounded min-w-[32px] sm:min-w-[40px] text-center mx-0.5 sm:mx-1 transition-colors text-xs sm:text-sm ${
                    page === p
                      ? "bg-[#0F5F4D] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  {p}
                </button>
              )
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
          >
            <div className="flex items-center gap-1 sm:gap-2 text-[#18181B] font-medium text-xs sm:text-sm">
              <span className="hidden sm:inline">ถัดไป</span>
              <ChevronRight size={14} className="sm:w-4 sm:h-4" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};