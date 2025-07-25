import Link from "next/link";
import Image from "next/image";
import { IconEye } from "@tabler/icons-react";

// Footer data configuration
const FOOTER_SECTIONS = [
  {
    title: "รู้จักโครงการ",
    links: [{ title: "ข้อมูลโครงการ", href: "/" }],
  },
  {
    title: "สื่อประชาสัมพันธ์",
    links: [
      { title: "ข่าวประชาสัมพันธ์", href: "/" },
      { title: "คลังความรู้", href: "/about" },
    ],
  },
  {
    title: "คำถามที่พบบ่อย",
    links: [{ title: "ติดต่อเรา", href: "/help", isBold: true }],
  },
];

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    icon: "/backoffice/images/footer/facebook.png",
    href: "#",
  },
  { name: "Youtube", icon: "/backoffice/images/footer/youtube.png", href: "#" },
  {
    name: "Instagram",
    icon: "/backoffice/images/footer/instagram.png",
    href: "#",
  },
  { name: "Twitter", icon: "/backoffice/images/footer/twitter.png", href: "#" },
];

const COMPANY_INFO = {
  logo: "/backoffice/images/logo.png",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fermentum sapien eget leo sodales vehicula nec consequat quam.",
  copyright: "HEALTH UP",
};

// Reusable components
const FooterSection = ({
  title,
  links,
}: {
  title: string;
  links: Array<{ title: string; href: string; isBold?: boolean }>;
}) => (
  <div className="flex-shrink-0 ">
    <h3 className="text-md font-semibold text-white tracking-wider uppercase mb-4">
      {title}
    </h3>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={`text-white hover:text-primary transition-colors ${
              link.isBold ? "font-semibold" : ""
            }`}
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SocialLink = ({
  name,
  icon,
  href,
}: {
  name: string;
  icon: string;
  href: string;
}) => (
  <a
    href={href}
    className="text-white hover:text-primary transition-colors"
    aria-label={name}
  >
    <Image src={icon} alt={name} width={24} height={24} />
  </a>
);

export function Footer() {
  return (
    <div
      style={{
        backgroundImage: "url('/backoffice/images/footer/footer-bg.png')",
        backgroundSize: "contain",
        backgroundPosition: "top",
        backgroundRepeat: "repeat-y",
      }}
    >
      <footer className="bg-highlight rounded-4xl mx-3 mb-3 mt-20">
        <div className="py-12 px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
            {/* Company Info - Left Side */}
            <div className="flex flex-col gap-4 lg:max-w-sm">
              <Image
                src={COMPANY_INFO.logo}
                alt="logo"
                width={50}
                height={50}
                className="w-full h-auto max-w-20"
              />
              <p className="text-white text-sm leading-relaxed">
                {COMPANY_INFO.description}
              </p>
            </div>

            {/* Footer Sections - Right Side */}
            <div className=" flex-row md:mx-2 gap-4 lg:gap-12 hidden md:flex">
              {FOOTER_SECTIONS.map((section) => (
                <FooterSection
                  key={section.title}
                  title={section.title}
                  links={section.links}
                />
              ))}
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-between lg:justify-between space-x-4 mt-8">
            <div className="flex items-center gap-2 text-white">
              <IconEye className="w-7 h-7" /> 199,999
            </div>
            <p className="text-center text-sm text-gray-400">
              Copyright &copy; {COMPANY_INFO.copyright}{" "}
              {new Date().getFullYear()}
            </p>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => (
                <SocialLink
                  key={social.name}
                  name={social.name}
                  icon={social.icon}
                  href={social.href}
                />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
