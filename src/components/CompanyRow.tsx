import { TableCell, TableRow } from "@/components/ui/table"
import { HealthStatusDot } from "./HealthStatusDot"

export function CompanyRow({ company }: { company: any }) {
  return (
    <TableRow>
      <TableCell>1</TableCell>
      <TableCell>{company.name}</TableCell>
      <TableCell>{company.totalEmployees}</TableCell>
      <TableCell>{company.male}</TableCell>
      <TableCell>{company.female}</TableCell>
      <TableCell><HealthStatusDot status={company.bmi} /></TableCell>
      <TableCell><HealthStatusDot status={company.blood} /></TableCell>
      <TableCell><HealthStatusDot status={company.diabetes} /></TableCell>
      <TableCell><HealthStatusDot status={company.packages} /></TableCell>
      <TableCell><HealthStatusDot status={company.projects} /></TableCell>
      <TableCell><HealthStatusDot status={company.permissions} /></TableCell>
    </TableRow>
  )
}
