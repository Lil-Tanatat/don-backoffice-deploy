import { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex flex-row min-h-screen w-full">
        <AppSidebar variant="inset" />
        <SidebarInset className="flex flex-col flex-1 min-h-0">
          <SiteHeader />
          <div className="flex flex-1 flex-col min-h-0">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
