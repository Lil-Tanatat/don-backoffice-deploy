import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import formConfig from "@/form/register.json";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { FormField } from "@/components/form-field";
import {
  phoneNumberOnly,
  taxIdOnly,
  zipcodeOnly,
  validatePassword,
  validateUsername,
  numberOnly,
  validateTaxId,
  // thaiOnly
} from "@/utils/formValidation";
import {
  useProvinces,
  useDistricts,
  useSubDistricts,
} from "@/hooks/location/useLocation";

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "select" | "multiselect";
  required: boolean;
  colSpan: number;
  options?: { title: string; value: string }[];
}

interface FormSection {
  title: string;
  fields: FormField[];
}

const formSections: FormSection[] = formConfig.formSections as FormSection[];

interface FormData {
  [key: string]: string | string[];
}

interface FormErrors {
  [key: string]: string;
}

interface RegisterFormProps {
  className?: string;
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting: boolean;
}

export function RegisterForm({
  className,
  onSubmit,
  isSubmitting,
}: RegisterFormProps) {
  const [formData, setFormData] = React.useState<FormData>({});
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [termsError, setTermsError] = React.useState("");

  // Location state management
  const [selectedProvinceId, setSelectedProvinceId] = React.useState<
    number | null
  >(null);
  const [selectedDistrictId, setSelectedDistrictId] = React.useState<
    number | null
  >(null);
  const [selectedSubDistrictId, setSelectedSubDistrictId] = React.useState<
    number | null
  >(null);

  // Location data hooks
  const { data: provincesData } = useProvinces();
  const { data: districtsData } = useDistricts(selectedProvinceId);
  const { data: subDistrictsData } = useSubDistricts(selectedDistrictId);

  const validateField = (field: FormField, value: string | string[]) => {
    if (field.required) {
      if (field.type === "multiselect") {
        return Array.isArray(value) && value.length > 0
          ? ""
          : `${field.label} จำเป็นต้องเลือก`;
      } else {
        if (!value || value.toString().trim() === "") {
          return `จำเป็นต้องกรอก`;
        }
      }
    }

    // Additional field-specific validation
    if (typeof value === "string" && value.trim() !== "") {
      switch (field.name) {
        case "password":
          return validatePassword(value);
        case "confirm_password":
          if (formData.password && value !== formData.password) {
            return "รหัสผ่านไม่ตรงกัน";
          }
          return "";
        case "username":
          return validateUsername(value);
        case "citizen_id":
          return validateTaxId(value);
        default:
          return "";
      }
    }

    return "";
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    formSections.forEach((section) => {
      section.fields.forEach((field) => {
        const value = formData[field.name];
        const error = validateField(field, value);
        if (error) {
          newErrors[field.name] = error;
        }
      });
    });

    // Validate terms acceptance
    if (!termsAccepted) {
      setTermsError("กรุณายอมรับเงื่อนไขและบริการ");
    } else {
      setTermsError("");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && termsAccepted;
  };

  const handleInputChange = (name: string, value: string | string[]) => {
    // Apply validation based on field type
    let processedValue = value;
    if (typeof value === "string") {
      if (name === "org_phone" || name === "phone") {
        // processedValue = phoneNumberOnly(value);
      } else if (name === "org_zipcode") {
        processedValue = zipcodeOnly(value);
      } else if (name === "citizen_id") {
        processedValue = taxIdOnly(value);
      } else if (name === "employee_total") {
        processedValue = numberOnly(value);
      }
      // else if (name === "first_name" || name === "last_name") {
      //   processedValue = thaiOnly(value);
      // }
    }

    // Handle location field changes
    if (name === "org_province" && typeof value === "string") {
      const province = provincesData?.data.find((p) => p.name === value);
      if (province) {
        setSelectedProvinceId(province.id);
        setSelectedDistrictId(null);
        setSelectedSubDistrictId(null);
        // Clear dependent fields
        setFormData((prev) => ({
          ...prev,
          [name]: processedValue,
          org_area: "",
          org_district: "",
          org_zipcode: "",
        }));
      }
    } else if (name === "org_area" && typeof value === "string") {
      const district = districtsData?.data.find((d) => d.name === value);
      if (district) {
        setSelectedDistrictId(district.id);
        setSelectedSubDistrictId(null);
        // Clear dependent fields
        setFormData((prev) => ({
          ...prev,
          [name]: processedValue,
          org_district: "",
          org_zipcode: "",
        }));
      }
    } else if (name === "org_district" && typeof value === "string") {
      const subDistrict = subDistrictsData?.data.find(
        (sd) => sd.name === value
      );
      if (subDistrict) {
        setSelectedSubDistrictId(subDistrict.id);
        // Auto-populate zipcode
        setFormData((prev) => ({
          ...prev,
          [name]: processedValue,
          org_zipcode: subDistrict.postcode,
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: processedValue }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Validate the field immediately after input change
    const field = formSections
      .flatMap((section) => section.fields)
      .find((f) => f.name === name);

    if (field) {
      const fieldError = validateField(field, processedValue);
      if (fieldError) {
        setErrors((prev) => ({ ...prev, [name]: fieldError }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }

    // If password field changed, also revalidate confirm_password
    if (name === "password") {
      const confirmPasswordField = formSections
        .flatMap((section) => section.fields)
        .find((f) => f.name === "confirm_password");

      if (confirmPasswordField && formData.confirm_password) {
        const confirmPasswordError = validateField(
          confirmPasswordField,
          formData.confirm_password
        );
        setErrors((prev) => ({
          ...prev,
          confirm_password: confirmPasswordError,
        }));
      }
    }
  };

  const handleTermsChange = (checked: boolean) => {
    setTermsAccepted(checked);
    if (checked && termsError) {
      setTermsError("");
    }
  };

  // Function to get dynamic options for location fields
  const getFieldOptions = (fieldName: string) => {
    switch (fieldName) {
      case "org_province":
        return (
          provincesData?.data.map((province) => ({
            title: province.name,
            value: province.name,
          })) || []
        );
      case "org_area":
        return (
          districtsData?.data.map((district) => ({
            title: district.name,
            value: district.name,
          })) || []
        );
      case "org_district":
        return (
          subDistrictsData?.data.map((subDistrict) => ({
            title: subDistrict.name,
            value: subDistrict.name,
          })) || []
        );
      default:
        return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Prepare form data with location IDs for backend
    const submissionData: FormData = {
      ...formData,
    };

    // Add location IDs as additional properties if they exist
    if (selectedProvinceId) {
      (submissionData as any).org_province_id = selectedProvinceId;
    }
    if (selectedDistrictId) {
      (submissionData as any).org_district_id = selectedDistrictId;
    }
    if (selectedSubDistrictId) {
      (submissionData as any).org_subdistrict_id = selectedSubDistrictId;
    }

    await onSubmit(submissionData);
  };

  return (
    <form className={cn("space-y-8", className)} onSubmit={handleSubmit}>
      <Card className=" mx-auto">
        {formSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <CardHeader className="mb-3">
              <div className="text-xl font-bold text-gray-800">
                {section.title}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-12 gap-4">
                {section.fields.map((field) => {
                  // Use dynamic options for location fields
                  const isLocationField = [
                    "org_province",
                    "org_area",
                    "org_district",
                  ].includes(field.name);
                  const fieldOptions = isLocationField
                    ? getFieldOptions(field.name)
                    : field.options;

                  return (
                    <FormField
                      key={field.name}
                      {...field}
                      options={fieldOptions}
                      value={
                        formData[field.name] ||
                        (field.type === "multiselect" ? [] : "")
                      }
                      error={errors[field.name]}
                      onChange={handleInputChange}
                      disabled={
                        (field.name === "org_area" && !selectedProvinceId) ||
                        (field.name === "org_district" &&
                          !selectedDistrictId) ||
                        field.name === "org_zipcode" // Auto-populated, read-only
                      }
                    />
                  );
                })}
              </div>
            </CardContent>
          </div>
        ))}
        <div className="flex justify-center pb-4">
          {(Object.keys(errors).length > 0 || termsError) && (
            <span className="text-destructive text-sm">
              * กรุณากรอกแบบฟอร์มให้ครบถ้วน
            </span>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4 lg:gap-2">
            <Checkbox
              className={cn(
                "w-5 h-5 bg-white",
                termsError &&
                  "border-red-500 data-[state=unchecked]:border-red-500"
              )}
              checked={termsAccepted}
              onCheckedChange={handleTermsChange}
            />
            <div className="text-sm lg:text-md flex flex-col lg:flex-row gap-2">
              ฉันยอมรับ ข้อกำหนดเงื่อนไขและบริการ
              <Link
                className="text-primary cursor-pointer underline underline-offset-2"
                href="https://anamai.moph.go.th/th/privacy-policy"
                target="_blank"
              >
                ดูรายละเอียดเพิ่มเติมได้ที่
              </Link>
            </div>
          </div>
          {termsError && (
            <span className="text-red-500 text-sm">{termsError}</span>
          )}
        </div>
        <div className="flex justify-center pt-6 mb-10">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full max-w-xs bg-secondary text-white rounded-full text-lg"
          >
            {isSubmitting ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
          </Button>
        </div>
      </Card>
    </form>
  );
}
