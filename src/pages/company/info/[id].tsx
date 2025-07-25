import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CompanyInfoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  console.log("Company ID:", id);

  const [selectedServices] = useState(["กิจกรรมทางกาย", "สุขภาพจิต"]);

  const [formData] = useState({
    companyName: "บริษัท ตัวอย่าง จำกัด",
    companyCode: "EX001",
    employeeCount: "150",
    organizationSize: "m",
    locationDetails: "123 ถนนสุขุมวิท",
    subDistrict: "bangna-north",
    district: "bangna",
    province: "bangkok",
    postalCode: "10260",
    phone: "02-123-4567",
    email: "info@example.com",
  });

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/");
    }
  };

  const handleEdit = () => {
    router.push(`/company/edit/${id}`);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="w-full max-w-none mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-[#09090B]">
              ข้อมูลสถานประกอบการ
            </h1>
          </div>
          <div className="flex gap-3">
            <Button
              className="bg-transparent border border-[#0F5F4D] text-[#0F5F4D] px-6"
              onClick={handleBack}
            >
              ย้อนกลับ
            </Button>
            <Button
              className="bg-[#0F5F4D] text-white px-6 flex items-center gap-2"
              onClick={handleEdit}
            >
              <Users className="w-4 h-4" />
              สวมสิทธิ์การใช้งาน
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="companyName"
                className="text-sm font-medium text-[#18181B]"
              >
                ชื่อสถานประกอบกิจการ
              </Label>
              <Input
                id="companyName"
                className="w-full h-10 bg-gray-50"
                value={formData.companyName}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="companyCode"
                className="text-sm font-medium text-[#18181B]"
              >
                รหัสสถานประกอบกิจการ
              </Label>
              <Input
                id="companyCode"
                className="w-full h-10 bg-gray-50"
                value={formData.companyCode}
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="employeeCount"
                className="text-sm font-medium text-[#18181B]"
              >
                จำนวนพนักงานทั้งหมด
              </Label>
              <Input
                id="employeeCount"
                className="w-full h-10 bg-gray-50"
                value={formData.employeeCount}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="organizationSize"
                className="text-sm font-medium text-[#18181B]"
              >
                ขนาดองค์กร
              </Label>
              <Select value={formData.organizationSize} disabled>
                <SelectTrigger className="w-full h-10 bg-gray-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="s">ขนาด S</SelectItem>
                  <SelectItem value="m">ขนาด M</SelectItem>
                  <SelectItem value="l">ขนาด L</SelectItem>
                  <SelectItem value="xl">ขนาด XL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="locationDetails"
                className="text-sm font-medium text-[#18181B]"
              >
                รายละเอียดที่อยู่
              </Label>
              <Input
                id="locationDetails"
                className="w-full h-10 bg-gray-50"
                value={formData.locationDetails}
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="subDistrict"
                className="text-sm font-medium text-[#18181B]"
              >
                ตำบล / แขวง
              </Label>
              <Select value={formData.subDistrict} disabled>
                <SelectTrigger className="w-full h-10 bg-gray-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bangna-north">บางนาเหนือ</SelectItem>
                  <SelectItem value="bangna-south">บางนาใต้</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="district"
                className="text-sm font-medium text-[#18181B]"
              >
                อำเภอ / เขต
              </Label>
              <Select value={formData.district} disabled>
                <SelectTrigger className="w-full h-10 bg-gray-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bangna">บางนา</SelectItem>
                  <SelectItem value="chatuchak">จตุจักร</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="province"
                className="text-sm font-medium text-[#18181B]"
              >
                จังหวัด
              </Label>
              <Select value={formData.province} disabled>
                <SelectTrigger className="w-full h-10 bg-gray-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bangkok">กรุงเทพมหานคร</SelectItem>
                  <SelectItem value="nonthaburi">นนทบุรี</SelectItem>
                  <SelectItem value="pathum-thani">ปทุมธานี</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="postalCode"
                className="text-sm font-medium text-[#18181B]"
              >
                รหัสไปรษณีย์
              </Label>
              <Input
                id="postalCode"
                className="w-full h-10 bg-gray-50"
                value={formData.postalCode}
                disabled
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-[#18181B]"
              >
                เบอร์โทรศัพท์ติดต่อ (อุปกรณ์สถานความปลอดภัยประกอบการ)
              </Label>
              <Input
                id="phone"
                className="w-full h-10 bg-gray-50"
                value={formData.phone}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-[#18181B]"
              >
                อีเมล
              </Label>
              <Input
                id="email"
                type="email"
                className="w-full h-10 bg-gray-50"
                value={formData.email}
                disabled
              />
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <Label className="text-sm font-medium text-[#18181B]">
            กิจกรรมประเมินอุปกรณ์การองค์กร
          </Label>
          <div className="border border-gray-300 rounded-md p-3 min-h-10 flex flex-wrap gap-1 items-center bg-gray-50">
            {selectedServices.map((service, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-[#F1F5F9] text-black border px-2 rounded-full py-0.5 text-sm"
              >
                {service}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
