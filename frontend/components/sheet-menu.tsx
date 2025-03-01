"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import CreatePostDialog from "@/components/create-post-dialog"
import { ModeToggle } from "@/components/mode-toggle"
import SettingsButton from "@/components/settings-button"
import { Menu, Home, Map, Users, User, SquarePen } from "lucide-react"
import { useEffect, useState } from "react"

export default function SheetMenu() {
    const [username, setUsername] = useState<string | null>(null);
    
    useEffect(() => {
        setUsername(localStorage.getItem("username"))
    }, [])

    const menuItems = [
        {icon: SquarePen, label: "Posts", href: "/posts"},
        {icon: Home, label: "Home", href: "/"},
        {icon: Map, label: "Map", href: "/map"},
        {icon: Users, label: "Social Link", href: "/social-link"},
        {icon: User, label: "Profile", href: `/${username}`},
    ]

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-2">
                <SheetHeader className="border-b p-4">
                    <SheetTitle className="text-2xl">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 grow mt-4">
                    {menuItems.map((item, index) => (
                        <Link key={index} href={item.href} passHref>
                            <Button variant="ghost">
                                <item.icon />
                                <span className="ml-2 text-xl">{item.label}</span>
                            </Button>
                        </Link>
                    ))}
                </div>
                <SheetFooter className="flex flex-row gap-2 p-4 justify-start border-t">
                    <CreatePostDialog />
                    <SettingsButton />
                    <ModeToggle />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}