import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FileDown, Plus } from "lucide-react";

export function PageHeaderActions() {
  const router = useRouter();

  const handleAddCompany = () => {
    router.push("/company/add");
  };
  return (
    <div className="flex gap-2">
      <Button className="bg-transparent" variant="outline">
        <FileDown className="w-6 h-6" />
        ดาวน์โหลด Excel
      </Button>
      <Button className="bg-[#0F5F4D]" onClick={handleAddCompany}>
        <Plus className="w-6 h-6" />
        เพิ่มสถานประกอบการ
      </Button>
    </div>
  );
}
