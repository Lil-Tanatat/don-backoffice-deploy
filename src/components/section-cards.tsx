import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { IconBuildings, IconUser, IconCircleFilled } from "@tabler/icons-react";
import { EmployeeStatCard, HealthStatCard } from "@/types/dashboard";

const employeeInfoCards: EmployeeStatCard[] = [
  {
    title: "สถานประกอบทั้งหมด",
    value: "2,468",
    description: "+20.1% from last month",
    icon: <IconBuildings className="w-4 h-4 text-[#71717A]" />,
  },
  {
    title: "พนักงานที่เข้าร่วมทั้งหมด",
    value: "12,234",
    description: "+19% from last month",
    icon: <IconUser className="w-4 h-4 text-[#71717A]" />,
  },
  {
    title: "พนักงานชายทั้งหมด",
    value: "4,234",
    description: "+19% from last month",
    icon: <IconUser className="w-4 h-4 text-[#71717A]" />,
  },
  {
    title: "พนักงานหญิงทั้งหมด",
    value: "7,234",
    description: "+19% from last month",
    icon: <IconUser className="w-4 h-4 text-[#71717A]" />,
  },
];

const healthInfoCards: HealthStatCard[] = [
  {
    title: "ค่า BMI",
    value: "40",
    description: "สถานประกอบการ",
    bg: "border border-[#EFB8C8]",
    color: "text-[#EFB8C8]",
  },
  {
    title: "ไขมันคอเลสเตอรอล",
    value: "56",
    description: "สถานประกอบการ",
    bg: "border border-[#8C1D18]",
    color: "text-[#8C1D18]",
  },
  {
    title: "ไขมันไตรกลีเซอไรด์",
    value: "71",
    description: "สถานประกอบการ",
    bg: "border border-[#E46962]",
    color: "text-[#E46962]",
  },
  {
    title: "น้ำตาลในเลือด",
    value: "55",
    description: "สถานประกอบการ",
    bg: "border border-[#65558F]",
    color: "text-[#65558F]",
  },
  {
    title: "ความดันโลหิต",
    value: "92",
    description: "สถานประกอบการ",
    bg: "border border-[#32ADE6]",
    color: "text-[#32ADE6]",
  },
  {
    title: "รอบเอว",
    value: "17",
    description: "สถานประกอบการ",
    bg: "border border-[#792A9D]",
    color: "text-[#792A9D]",
  },
];

export function SectionCards() {
  return (
    <div className="space-y-6">
      {/* Employee Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {employeeInfoCards.map((card, index) => (
          <Card
            key={`employee-${index}`}
            className="w-full shadow-md rounded-[12px] border border-[#E4E4E7]"
          >
            <CardHeader>
              <div className="flex justify-between items-center text-lg text-[#09090B] font-semibold">
                <div>{card.title}</div>
                <div>{card.icon}</div>
              </div>
              <CardTitle className="text-3xl font-bold">{card.value}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {card.description}
              </p>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Health Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {healthInfoCards.map((card, index) => (
          <Card
            key={`health-${index}`}
            className={`${card.bg} h-[144px] shadow-md px-2 py-3 text-center rounded-[12px] border-solid flex items-center justify-center`}
          >
            <div className="flex flex-col items-center justify-center space-y-1">
              <CardDescription className="text-sm font-medium text-black">
                <div className="flex items-center gap-2">
                  <IconCircleFilled
                    className={`${card.color} w-4.5 h-4.5 shadow-lg rounded-[12px] stroke-2 stroke-white`}
                  />
                  {card.title}
                </div>
              </CardDescription>
              <CardTitle className="text-2xl font-bold">{card.value}</CardTitle>
              <p className="text-sm font-medium">
                {/* {card.description} */}
                แห่ง
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
