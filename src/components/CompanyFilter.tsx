import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CompanyFilters({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (v: string) => void;
}) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [zone, setZone] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap justify-between items-start gap-4 w-full">
        <div className="flex items-center gap-2 flex-wrap">
          <label className="font-semibold">ค้นหา :</label>
          <div className="relative">
            <Input
              placeholder="ชื่อสถานประกอบการ"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-72 pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <label className="font-semibold">ตัวกรอง :</label>

          <Select value={zone} onValueChange={setZone}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="เขตสุขภาพที่" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="zone1">เขตสุขภาพที่ 1</SelectItem>
              <SelectItem value="zone2">เขตสุขภาพที่ 2</SelectItem>
            </SelectContent>
          </Select>

          <Select value={province} onValueChange={setProvince}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="จังหวัด" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bangkok">กรุงเทพ</SelectItem>
              <SelectItem value="chiangmai">เชียงใหม่</SelectItem>
            </SelectContent>
          </Select>

          <Select value={district} onValueChange={setDistrict}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="อำเภอ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="district1">อำเภอ 1</SelectItem>
            </SelectContent>
          </Select>

          <Select value={subDistrict} onValueChange={setSubDistrict}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="ตำบล" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sub1">ตำบล 1</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4 w-full">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full shadow-md border border-white bg-[#EC221F]" />
            <span className="text-sm">ป่วย</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full shadow-md border border-white bg-[#E8B931]" />
            <span className="text-sm">เสี่ยง</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full shadow-md border border-white bg-[#14AE5C]" />
            <span className="text-sm">ดี</span>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium whitespace-nowrap">
              เดือน ปี (ย้อนหลัง 3 ปี) :
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "w-[240px] text-left bg-white border rounded-md px-3 py-2 text-sm",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? format(date, "MM / yy") : "MM / YY"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button variant="outline" className="text-primary border-primary bg-transparent">
            ล้างค่า
          </Button>
        </div>
      </div>
    </div>
  );
}
