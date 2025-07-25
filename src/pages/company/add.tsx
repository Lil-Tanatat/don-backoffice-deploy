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
import { X, Plus } from "lucide-react";

export default function AddCompanyForm() {
  const [selectedServices, setSelectedServices] = useState([
    "กิจกรรมทางกาย",
    "สุขภาพจิต",
  ]);
  const [showActivitySelect, setShowActivitySelect] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    companyCode: "",
    employeeCount: "",
    organizationSize: "",
    locationDetails: "",
    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
    phone: "",
    email: "",
  });

  const availableActivities = [
    "การจัดการความเครียด",
    "การพัฒนาทักษะภาวะผู้นำ",
    "กิจกรรมเสริมสร้างทีมเวิร์ค",
    "การออกแบบสถานที่ทำงาน",
    "การประเมินความเสี่ยงด้านสุขภาพ",
    "โปรแกรมการออกกำลังกาย",
    "การฝึกอบรมด้านความปลอดภัย",
    "กิจกรรมด้านสิ่งแวดล้อม",
  ];

  const unselectedActivities = availableActivities.filter(
    (activity) => !selectedServices.includes(activity)
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      setFormData({
        companyName: "",
        companyCode: "",
        employeeCount: "",
        organizationSize: "",
        locationDetails: "",
        subDistrict: "",
        district: "",
        province: "",
        postalCode: "",
        phone: "",
        email: "",
      });
      setSelectedServices(["กิจกรรมทางกาย", "สุขภาพจิต"]);
    }
  };

  const handleSubmit = () => {
    const submissionData = {
      ...formData,
      activities: selectedServices,
    };

    if (window.history.length > 1) {
      window.history.back();
    } else {
      setFormData({
        companyName: "",
        companyCode: "",
        employeeCount: "",
        organizationSize: "",
        locationDetails: "",
        subDistrict: "",
        district: "",
        province: "",
        postalCode: "",
        phone: "",
        email: "",
      });
      setSelectedServices(["กิจกรรมทางกาย", "สุขภาพจิต"]);
    }
  };

  const removeService = (serviceToRemove: string) => {
    setSelectedServices(
      selectedServices.filter((service) => service !== serviceToRemove)
    );
  };

  const addService = (serviceToAdd: string) => {
    if (!selectedServices.includes(serviceToAdd)) {
      setSelectedServices([...selectedServices, serviceToAdd]);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".activity-selector")) {
        setShowActivitySelect(false);
      }
    };

    if (showActivitySelect) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showActivitySelect]);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="w-full max-w-none mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-[#09090B]">
            เพิ่มสถานประกอบการ
          </h1>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="bg-transparent text-[#0F5F4D] border-[#0F5F4D] px-6"
              onClick={handleCancel}
            >
              ยกเลิก
            </Button>
            <Button
              className="bg-[#0F5F4D] text-white px-6"
              onClick={handleSubmit}
            >
              บันทึก
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
                ชื่อสถานประกอบกิจการ <span className="text-red-500">*</span>
              </Label>
              <Input
                id="companyName"
                placeholder="ชื่อสถานประกอบกิจการ"
                className="w-full h-10"
                value={formData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="companyCode"
                className="text-sm font-medium text-[#18181B]"
              >
                รหัสสถานประกอบกิจการ <span className="text-red-500">*</span>
              </Label>
              <Input
                id="companyCode"
                placeholder="รหัสสถานประกอบกิจการ"
                className="w-full h-10"
                value={formData.companyCode}
                onChange={(e) =>
                  handleInputChange("companyCode", e.target.value)
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="employeeCount"
                className="text-sm font-medium text-[#18181B]"
              >
                จำนวนพนักงานทั้งหมด <span className="text-red-500">*</span>
              </Label>
              <Input
                id="employeeCount"
                placeholder="จำนวนพนักงานทั้งหมด"
                className="w-full h-10"
                value={formData.employeeCount}
                onChange={(e) =>
                  handleInputChange("employeeCount", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="organizationSize"
                className="text-sm font-medium text-[#18181B]"
              >
                ขนาดองค์กร <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.organizationSize}
                onValueChange={(value) =>
                  handleInputChange("organizationSize", value)
                }
              >
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder="เลือกขนาดองค์กร" />
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
                รายละเอียดที่อยู่ <span className="text-red-500">*</span>
              </Label>
              <Input
                id="locationDetails"
                placeholder="รายละเอียดที่อยู่"
                className="w-full h-10"
                value={formData.locationDetails}
                onChange={(e) =>
                  handleInputChange("locationDetails", e.target.value)
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="subDistrict"
                className="text-sm font-medium text-[#18181B]"
              >
                ตำบล / แขวง <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.subDistrict}
                onValueChange={(value) =>
                  handleInputChange("subDistrict", value)
                }
              >
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder="เลือกตำบล/แขวง" />
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
                อำเภอ / เขต <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.district}
                onValueChange={(value) => handleInputChange("district", value)}
              >
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder="เลือกอำเภอ/เขต" />
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
                จังหวัด <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.province}
                onValueChange={(value) => handleInputChange("province", value)}
              >
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder="เลือกจังหวัด" />
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
                รหัสไปรษณีย์ <span className="text-red-500">*</span>
              </Label>
              <Input
                id="postalCode"
                placeholder="รหัสไปรษณีย์"
                className="w-full h-10"
                value={formData.postalCode}
                onChange={(e) =>
                  handleInputChange("postalCode", e.target.value)
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-[#18181B]"
              >
                เบอร์โทรศัพท์ติดต่อ (อุปกรณ์สถานความปลอดภัยประกอบการ){" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                placeholder="เบอร์โทรศัพท์ติดต่อ"
                className="w-full h-10"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-[#18181B]"
              >
                อีเมล <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="อีเมล"
                className="w-full h-10"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <Label className="text-sm font-medium text-[#18181B]">
            กิจกรรมประเมินอุปกรณ์การองค์กร
          </Label>
          <div className="relative activity-selector">
            <div
              className="border border-gray-300 rounded-md p-3 min-h-10 flex flex-wrap gap-1 items-center cursor-pointer"
              onClick={() => setShowActivitySelect(!showActivitySelect)}
            >
              {selectedServices.map((service, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-[#F1F5F9] text-black border px-2 rounded-full py-0.5 flex items-center gap-1 text-sm"
                >
                  {service}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      removeService(service);
                    }}
                    className="hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X
                      className="bg-[#94A3B8] border rounded-full text-[#E6FAFA]"
                      size={16}
                    />
                  </button>
                </Badge>
              ))}
            </div>

            {showActivitySelect && (
              <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-48 overflow-y-auto">
                {unselectedActivities.map((activity) => (
                  <div
                    key={activity}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => {
                      addService(activity);
                      setShowActivitySelect(false);
                    }}
                  >
                    {activity}
                  </div>
                ))}
                {unselectedActivities.length === 0 && (
                  <div className="px-3 py-2 text-gray-500 text-sm">
                    ไม่มีกิจกรรมให้เลือกเพิ่ม
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
