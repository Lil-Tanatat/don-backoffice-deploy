"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { th } from "date-fns/locale";

import { cn } from "@/lib/utils";
import {
  convertBuddhistToGregorianDate,
  convertGregorianToBuddhistDate,
} from "@/utils/convertyear";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  label?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "เลือกวันที่",
  className,
  id,
  label,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    value ? convertBuddhistToGregorianDate(value) || undefined : undefined
  );

  // Update internal date when value prop changes
  React.useEffect(() => {
    if (value) {
      setDate(convertBuddhistToGregorianDate(value) || undefined);
    } else {
      setDate(undefined);
    }
  }, [value]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      // Use utility function to convert to Buddhist year format
      onChange?.(convertGregorianToBuddhistDate(selectedDate));
    } else {
      onChange?.("");
    }
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDate(undefined);
    onChange?.("");
  };

  const formatDisplayDate = (date: Date) => {
    // Format with Thai locale and Buddhist Era year
    const thaiMonth = format(date, "MMMM", { locale: th });
    const buddhistYear = date.getFullYear() + 543;
    const day = date.getDate();
    return `${day} ${thaiMonth} ${buddhistYear}`;
  };

  // Custom formatters for Thai months and Buddhist Era years
  const thaiFormatters = {
    formatMonthDropdown: (date: Date) => {
      return format(date, "MMMM", { locale: th });
    },
    formatYearDropdown: (date: Date) => {
      const buddhistYear = date.getFullYear() + 543;
      return buddhistYear.toString();
    },
  };

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <Label htmlFor={id} className="px-1">
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            className={cn(
              "w-full justify-between font-normal h-9 text-black bg-white border-1 border-gray-300 hover:!bg-white",
              className
            )}
          >
            {date ? formatDisplayDate(date) : placeholder}
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            captionLayout="dropdown"
            locale={th}
            formatters={thaiFormatters}
            // fromYear={1900}
            // toYear={2030}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
