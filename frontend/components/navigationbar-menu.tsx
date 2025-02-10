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
                <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="/map" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Map</NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="/social-link" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Social Link</NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <Link href="/profile" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Profile</NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        </NavigationMenuList>
        </NavigationMenu>
    )
}