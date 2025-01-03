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
                <Link href="/login" passHref> 
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Login</NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="/login" passHref> 
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="/map" passHref> 
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Map</NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="/login" passHref> 
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Profile</NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        </NavigationMenuList>
        </NavigationMenu>
    )
}