"use client";

import { usePathname } from "next/navigation";
import NavigationBar from "@/components/navigation-bar";
import { SidebarOverlay } from "@/components/sidebar-overlay";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  const authRoutes = ["/login", "/signup", "/sign-up"];
  const shouldHideNavigation = authRoutes.includes(pathname);

  if (shouldHideNavigation) {
    return <main className="w-full flex-1 max-w-full">{children}</main>;
  }

  return (
    <>
      <NavigationBar />
      <SidebarOverlay />
      <main className="w-full flex-1 pt-14 px-8 md:pl-72 max-w-full">
        {children}
      </main>
    </>
  );
}
