'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export function SidebarOverlay() {
  return (
    <div className="fixed top-16 left-0 z-40 hidden md:block">
      <div className="h-[calc(100vh-4rem)] w-64 overflow-hidden data-[state=collapsed]:w-16">
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </div>
    </div>
  );
}
