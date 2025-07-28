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
} from '@/components/ui/sidebar';
import { sidebarRoutes } from '@/constants/routes';

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar
      className="bg-background border-border h-full border-r shadow-sm"
      collapsible="icon"
      style={
        {
          '--sidebar-width': '18rem',
          '--sidebar-width-icon': '4rem',
        } as React.CSSProperties
      }
    >
      <SidebarContent className="p-4 pt-12">
        <SidebarGroup>
          <div
            className={`mb-4 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}
          >
            {!isCollapsed && (
              <SidebarGroupLabel className="text-foreground text-lg font-semibold">
                Menu
              </SidebarGroupLabel>
            )}
            <SidebarTrigger className={isCollapsed ? 'ml-3' : 'ml-3'} />
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {sidebarRoutes.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={isCollapsed ? item.title : undefined}
                    className={`hover:bg-accent text-foreground hover:text-accent-foreground flex items-center gap-3 rounded-md p-4 transition-colors ${
                      isCollapsed ? 'justify-center' : ''
                    }`}
                  >
                    <a href={item.url}>
                      <item.icon className="h-5 w-5 flex-shrink-0" />
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
