import React from "react";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon: Icon,
}) => {
  return (
    <div
      className="flex flex-row gap-4 justify-center text-primary-foreground py-10 rounded-b-3xl mb-5"
      style={{
        backgroundImage: "url('/images/header-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-center text-center min-h-24">
        <h1 className="text-xl lg:text-4xl font-semibold flex flex-col lg:flex-row gap-2 items-center justify-center my-auto">
          {Icon && <Icon className="w-10 h-auto lg:w-12" />}
          {title}
        </h1>
        {subtitle && <p className="text-md text-center mt-4">{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHeader;
