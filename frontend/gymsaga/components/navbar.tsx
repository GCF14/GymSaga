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
                <Link href="/posts" passHref> 
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Posts Testing Page</NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="/" passHref> 
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="/map" passHref> 
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Map</NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="/profile" passHref> 
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Profile</NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        </NavigationMenuList>
        </NavigationMenu>
    )
}