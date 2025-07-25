export function HealthStatusDot({ status }: { status: "bad" | "warning" | "good" }) {
  const colorMap = {
    bad: "bg-[#EC221F]",
    warning: "bg-[#E8B931]",
    good: "bg-[#14AE5C]",
  }

  return <span className={`inline-block w-3 h-3 rounded-full ${colorMap[status]}`} />
}
