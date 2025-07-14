import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import { sidebarRoutes } from "@/constants/routes";

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      className="bg-background border-r border-border shadow-sm h-full"
      collapsible="icon"
      style={
        {
          "--sidebar-width": "18rem",
          "--sidebar-width-icon": "4rem",
        } as React.CSSProperties
      }
    >
      <SidebarContent className="p-4 pt-12">
        <SidebarGroup>
          <div
            className={`flex items-center mb-4 ${isCollapsed ? "justify-center" : "justify-between"}`}
          >
            {!isCollapsed && (
              <SidebarGroupLabel className="text-lg font-semibold text-foreground">
                Menu
              </SidebarGroupLabel>
            )}
            <SidebarTrigger className={isCollapsed ? "ml-3" : "ml-3"} />
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {sidebarRoutes.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`flex items-center gap-3 p-4 rounded-md hover:bg-accent text-foreground hover:text-accent-foreground transition-colors ${
                      isCollapsed ? "justify-center" : ""
                    }`}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <a href={item.url}>
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
