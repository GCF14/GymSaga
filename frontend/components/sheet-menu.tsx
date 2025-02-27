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
import CreatePostDialog from "./create-post-dialog"
import { ModeToggle } from "@/components/mode-toggle"
import SettingsButton from "@/components/settings-button"

export default function SheetMenu() {
    const menuItems = [
        {icon: "post_add", label: "Posts", href: "/posts"},
        {icon: "home", label: "Home", href: "/"},
        {icon: "map", label: "Map", href: "/map"},
        {icon: "group", label: "Social Link", href: "/social-link"},
        {icon: "person", label: "Profile", href: "/profile"}
    ]

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <span className="material-symbols-rounded">
                        menu
                    </span>
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
                                <span className="material-symbols-rounded">{item.icon}</span>
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