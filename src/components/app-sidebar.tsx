import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IconCamera,
  IconChartBar,
  IconLayoutDashboard,
  IconBook,
  IconFileAi,
  IconFileDescription,
  IconAddressBook,
  IconHelp,
  IconBuildings,
  IconBuilding,
  IconSearch,
  IconFileText,
  IconSettings,
  IconBook2,
  IconMessageCircleQuestion,
  IconPhoto,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconLayoutDashboard,
    },
    {
      title: "สถานประกอบการ",
      url: "/company",
      icon: IconBuildings,
    },
    {
      title: "แบนเนอร์",
      url: "#",
      icon: IconChartBar,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "หน้าหลัก",
      url: "#",
      icon: IconBook,
    },
    {
      name: "รู้จักโครงการ",
      url: "#",
      icon: IconBuilding,
    },
    {
      name: "ติดต่อเรา",
      url: "#",
      icon: IconAddressBook,
    },
    {
      name: "สื่อประชาสัมพันธ์",
      url: "#",
      icon: IconFileText,
    },
    {
      name: "คลังความรู้",
      url: "#",
      icon: IconBook2,
    },
    {
      name: "คำถามที่พบบ่อย",
      url: "#",
      icon: IconMessageCircleQuestion,
    },
    {
      name: "จัดการสื่อ",
      url: "/media",
      icon: IconPhoto,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 h-full"
            >
              <Link href="/home" className="flex items-center gap-2">
                <Image
                  src="/images/New Navbar Logo.png"
                  alt="logo"
                  width={32}
                  height={32}
                />
                <span className="text-sm text-[#52525B] font-semibold">
                  ระบบบริหารจัดการ
                  <br />
                  ข้อมูลสุขภาพวัยทำงาน
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
