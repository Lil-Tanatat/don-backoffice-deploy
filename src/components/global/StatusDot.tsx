import React from "react";

export const statusColorMap: Record<string, string> = {
  bad: "bg-red-500",
  warning: "bg-yellow-400",
  good: "bg-green-500",
};

export function StatusDot({ status }: { status: string }) {
  const color = statusColorMap[status] || "bg-gray-400";
  return <span className={`inline-block w-3 h-3 rounded-full ${color}`} />;
}
