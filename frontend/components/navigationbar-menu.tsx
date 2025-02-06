import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
import Link from "next/link"

export default function Navbar() {
    return (
        <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/posts">Posts Testing Page</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/">Home</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/map">Map</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/social-link">Social Link</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/profile">Profile</NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
        </NavigationMenu>
    )
}