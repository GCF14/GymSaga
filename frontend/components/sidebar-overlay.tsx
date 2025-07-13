"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export function SidebarOverlay() {
  return (
    <div className="fixed left-0 top-16 z-40 hidden md:block">
      <div className="w-64 h-[calc(100vh-4rem)] overflow-hidden data-[state=collapsed]:w-16">
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </div>
    </div>
  );
}
