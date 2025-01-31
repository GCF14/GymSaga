import Image from "next/image";
import Navbar from "@/components/navigationbar-menu";
import { ModeToggle } from "@/components/modetoggle";
import { useTheme } from "next-themes";
import SettingsButton from "@/components/settings-button";
import Link from "next/link";
import CreatePostDialog from "./createpost-dialog";

export default function NavigationBar() {
    const { resolvedTheme } = useTheme();

    return (
        <header className="fixed top-0 z-50 flex items-center justify-between w-full h-16 bg-transparent backdrop-blur-md shadow-md border-solid border-b">
            <div className="flex items-center ml-4 flex-1 justify-start">
                <Link href="/" className="inline-flex">
                    <Image
                        src={resolvedTheme === "light" ? "/GymSagaDark.svg" : "/GymSagaLight.svg"}
                        width={40}
                        height={40}
                        alt="GymSaga Logo"
                    />
                    </Link>
                <Link href="/" className="inline-flex ml-2">
                    <h2 className="text-xl font-extrabold tracking-tight">GymSaga</h2>
                </Link>
            </div>
            <div className="flex-1 flex justify-center">
                <Navbar />
            </div>
            <div className="flex items-center mr-4 gap-4 flex-1 justify-end">
                <CreatePostDialog />
                <SettingsButton />
                <ModeToggle />
            </div>
        </header>
    );
}