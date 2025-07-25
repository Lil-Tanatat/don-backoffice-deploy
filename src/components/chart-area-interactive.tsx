"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
  LabelList,
} from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  {
    month: "ม.ค. 2568",
    bmi: 6,
    cholesterol: 6,
    triglyceride: 12,
    bloodSugar: 25,
    bloodPressure: 12,
    waist: 7,
  },
  {
    month: "ก.พ. 2568",
    bmi: 10,
    cholesterol: 6,
    triglyceride: 20,
    bloodSugar: 50,
    bloodPressure: 20,
    waist: 42,
  },
  {
    month: "มี.ค. 2568",
    bmi: 10,
    cholesterol: 10,
    triglyceride: 20,
    bloodSugar: 25,
    bloodPressure: 15,
    waist: 20,
  },
  {
    month: "เม.ย. 2568",
    bmi: 6,
    cholesterol: 6,
    triglyceride: 12,
    bloodSugar: 12,
    bloodPressure: 6,
    waist: 6,
  },
  {
    month: "พ.ค. 2568",
    bmi: 6,
    cholesterol: 6,
    triglyceride: 12,
    bloodSugar: 25,
    bloodPressure: 12,
    waist: 37,
  },
  {
    month: "มิ.ย. 2568",
    bmi: 6,
    cholesterol: 6,
    triglyceride: 20,
    bloodSugar: 30,
    bloodPressure: 12,
    waist: 9,
  },
  {
    month: "ก.ค. 2568",
    bmi: 6,
    cholesterol: 6,
    triglyceride: 12,
    bloodSugar: 25,
    bloodPressure: 12,
    waist: 21,
  },
  {
    month: "ส.ค. 2568",
    bmi: 6,
    cholesterol: 6,
    triglyceride: 12,
    bloodSugar: 25,
    bloodPressure: 12,
    waist: 8,
  },
  {
    month: "ก.ย. 2568",
    bmi: 6,
    cholesterol: 6,
    triglyceride: 12,
    bloodSugar: 25,
    bloodPressure: 12,
    waist: 15,
  },
  {
    month: "ต.ค. 2568",
    bmi: 6,
    cholesterol: 6,
    triglyceride: 12,
    bloodSugar: 25,
    bloodPressure: 12,
    waist: 15,
  },
  {
    month: "พ.ย. 2568",
    bmi: 6,
    cholesterol: 6,
    triglyceride: 12,
    bloodSugar: 25,
    bloodPressure: 12,
    waist: 15,
  },
  {
    month: "ธ.ค. 2568",
    bmi: 6,
    cholesterol: 6,
    triglyceride: 12,
    bloodSugar: 25,
    bloodPressure: 12,
    waist: 15,
  },
];

const chartConfig = {
  bmi: {
    label: "ค่า BMI",
    color: "#ED356A",
  },
  cholesterol: {
    label: "ไขมันคอเลสเตอรอล",
    color: "#8C1D18",
  },
  triglyceride: {
    label: "ไขมันไตรกลีเซอไรด์",
    color: "#E46962",
  },
  bloodSugar: {
    label: "น้ำตาลในเลือด",
    color: "#65558F",
  },
  bloodPressure: {
    label: "ความดันโลหิต",
    color: "#32ADE6",
  },
  waist: {
    label: "รอบเอว",
    color: "#792A9D",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("9m");
  // Calculate responsive dimensions
  const barWidth = isMobile ? 60 : 80;
  const chartHeight = isMobile ? 300 : 400;
  const minChartWidth = chartData.length * barWidth;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 h-[550px] sm:h-[600px] lg:h-[700px] flex flex-col">
      {/* Header */}
      <div className="px-3 sm:px-4 lg:px-6 py-3 flex-shrink-0">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-[#21272A] line-clamp-2">
              ความเสี่ยงโรคระดับพื้นที่
            </h2>
          </div>
        </div>
      </div>

      {/* Chart Content */}
      <div className="px-2 sm:px-3 lg:px-4 pb-4 flex-1 flex flex-col">
        <div
          className="flex-1 overflow-x-auto overflow-y-hidden
                    scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300
                    hover:scrollbar-thumb-gray-400
                    [&::-webkit-scrollbar]:h-1.5 sm:[&::-webkit-scrollbar]:h-2
                    [&::-webkit-scrollbar-track]:bg-[#F5F5F6]
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-[#7AC4C5]
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:hover:bg-gray-400
                    [&::-webkit-scrollbar-corner]:bg-transparent"
        >
          <ChartContainer
            config={chartConfig}
            className="h-full"
            style={{
              minWidth: `${minChartWidth}px`,
              width:
                chartData.length > (isMobile ? 6 : 9)
                  ? `${minChartWidth}px`
                  : "100%",
            }}
          >
            <BarChart
              data={chartData}
              width={
                chartData.length > (isMobile ? 6 : 9)
                  ? minChartWidth
                  : undefined
              }
              height={chartHeight}
              margin={{
                top: 20,
                right: isMobile ? 10 : 30,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: isMobile ? 10 : 12 }}
                interval={0}
                angle={isMobile ? -45 : 0}
                textAnchor={isMobile ? "end" : "middle"}
                height={isMobile ? 60 : 30}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: isMobile ? 10 : 12 }}
                domain={[0, 200]}
                ticks={[0, 50, 100, 150, 200]}
                width={isMobile ? 25 : 35}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    labelFormatter={(value) => `เดือน: ${value}`}
                  />
                }
              />

              {/* Stacked Bars with Labels */}
              <Bar dataKey="bmi" stackId="a" fill="var(--color-bmi)">
                <LabelList
                  dataKey="bmi"
                  position="center"
                  fill="white"
                  fontSize={isMobile ? 8 : 10}
                  fontWeight="bold"
                  formatter={(value: number) => (value > 0 ? value : "")}
                />
              </Bar>
              <Bar
                dataKey="cholesterol"
                stackId="a"
                fill="var(--color-cholesterol)"
              >
                <LabelList
                  dataKey="cholesterol"
                  position="center"
                  fill="white"
                  fontSize={isMobile ? 8 : 10}
                  fontWeight="bold"
                  formatter={(value: number) => (value > 0 ? value : "")}
                />
              </Bar>
              <Bar
                dataKey="triglyceride"
                stackId="a"
                fill="var(--color-triglyceride)"
              >
                <LabelList
                  dataKey="triglyceride"
                  position="center"
                  fill="white"
                  fontSize={isMobile ? 8 : 10}
                  fontWeight="bold"
                  formatter={(value: number) => (value > 0 ? value : "")}
                />
              </Bar>
              <Bar
                dataKey="bloodSugar"
                stackId="a"
                fill="var(--color-bloodSugar)"
              >
                <LabelList
                  dataKey="bloodSugar"
                  position="center"
                  fill="white"
                  fontSize={isMobile ? 8 : 10}
                  fontWeight="bold"
                  formatter={(value: number) => (value > 0 ? value : "")}
                />
              </Bar>
              <Bar
                dataKey="bloodPressure"
                stackId="a"
                fill="var(--color-bloodPressure)"
              >
                <LabelList
                  dataKey="bloodPressure"
                  position="center"
                  fill="white"
                  fontSize={isMobile ? 8 : 10}
                  fontWeight="bold"
                  formatter={(value: number) => (value > 0 ? value : "")}
                />
              </Bar>
              <Bar dataKey="waist" stackId="a" fill="var(--color-waist)">
                <LabelList
                  dataKey="waist"
                  position="center"
                  fill="white"
                  fontSize={isMobile ? 8 : 10}
                  fontWeight="bold"
                  formatter={(value: number) => (value > 0 ? value : "")}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>

        {/* Responsive Legend */}
        <div className="mt-3 sm:mt-4 flex-shrink-0 px-1 sm:px-2">
          {/* Mobile Layout: Compact 2 rows */}
          <div className="flex flex-col gap-2 sm:hidden">
            {/* First row: 3 items */}
            <div className="flex justify-center gap-3">
              {Object.entries(chartConfig)
                .slice(0, 3)
                .map(([key, config]) => (
                  <div
                    key={key}
                    className="flex items-center gap-1.5 flex-1 min-w-0"
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: config.color }}
                    />
                    <span className="text-[10px] text-[#000] leading-tight truncate">
                      {config.label}
                    </span>
                  </div>
                ))}
            </div>
            {/* Second row: 3 items */}
            <div className="flex justify-center gap-3">
              {Object.entries(chartConfig)
                .slice(3, 6)
                .map(([key, config]) => (
                  <div
                    key={key}
                    className="flex items-center gap-1.5 flex-1 min-w-0"
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: config.color }}
                    />
                    <span className="text-[10px] text-[#000] leading-tight truncate">
                      {config.label}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Tablet Layout: 3x2 Grid */}
          <div className="hidden sm:grid lg:hidden grid-cols-3 gap-x-4 gap-y-3 justify-center items-center">
            {Object.entries(chartConfig).map(([key, config]) => (
              <div
                key={key}
                className="flex flex-col items-center gap-1.5 min-w-0"
              >
                <div
                  className="w-3.5 h-3.5 rounded-full border border-white shadow-sm flex-shrink-0"
                  style={{ backgroundColor: config.color }}
                />
                <span className="text-xs text-[#000] text-center leading-tight line-clamp-2 max-w-[90px]">
                  {config.label}
                </span>
              </div>
            ))}
          </div>

          {/* Desktop Layout: Single Row with Dividers */}
          <div className="hidden lg:flex gap-6 justify-center items-center">
            {Object.entries(chartConfig).map(([key, config], index) => (
              <React.Fragment key={key}>
                <div className="flex flex-col items-center gap-2 min-w-0">
                  <div
                    className="w-4 h-4 rounded-full border border-white shadow-sm flex-shrink-0"
                    style={{ backgroundColor: config.color }}
                  />
                  <span className="text-sm text-[#000] text-center leading-tight">
                    {config.label}
                  </span>
                </div>
                {index < Object.entries(chartConfig).length - 1 && (
                  <div className="flex items-center h-full mx-2">
                    <div className="w-px h-8 bg-gray-300"></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
