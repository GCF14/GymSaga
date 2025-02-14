import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SheetMenu() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <span className="material-symbols-rounded">
                        menu
                    </span>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col mt-2 gap-2">
                    <Link href="/posts" passHref>
                        <Button className="w-full justify-start" variant="ghost">
                            <span className="material-symbols-rounded">
                                post_add
                            </span>
                            Posts
                        </Button>
                    </Link>
                    <Link href="/" passHref>
                        <Button className="w-full justify-start" variant="ghost">
                            <span className="material-symbols-rounded">
                                home
                            </span>
                            Home
                        </Button>
                    </Link>
                    <Link href="/map" passHref>
                        <Button className="w-full justify-start" variant="ghost">
                            <span className="material-symbols-rounded">
                                map
                            </span>
                            Map
                        </Button>
                    </Link>
                    <Link href="/social-link" passHref>
                        <Button className="w-full justify-start" variant="ghost">
                            <span className="material-symbols-rounded">
                                group
                            </span>
                            Social Link
                        </Button>
                    </Link>
                    <Link href="/profile" passHref>
                        <Button className="w-full justify-start" variant="ghost">
                            <span className="material-symbols-rounded">
                                person
                            </span>
                            Profile
                        </Button>
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    )
}