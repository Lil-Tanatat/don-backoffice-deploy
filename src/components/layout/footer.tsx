import Link from "next/link";
import Image from "next/image";
import { IconEye } from "@tabler/icons-react";


export function Footer() {
  return (
    <div
      style={{
        backgroundImage: "url('/backoffice/images/footer/footer-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "repeat-y",
      }}
    >
      <footer className="bg-highlight rounded-xl mx-3 mb-3 mt-10">
        <div className="py-6 px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
            {/* Company Info - Left Side */}
            <div className="flex flex-col gap-4 lg:max-w-sm">
              <p className="text-white text-sm leading-relaxed">กรมอนามัย</p>
            </div>

            {/* Footer Sections - Right Side */}
            <div className=" text-white flex-row gap-3 hidden md:flex">
              <a
                href="https://anamai.moph.go.th/th/privacy-policy"
                target="_blank"
                className="hover:text-primary"
              >
                นโยบายการคุ้มครองข้อมูลส่วนบุคคล
              </a>
              <a
                href="https://anamai.moph.go.th/th/website-security-policy"
                target="_blank"
                className="hover:text-primary"
              >
                นโยบายการรักษาความมั่นคงปลอดภัยเว็บไซต์
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
