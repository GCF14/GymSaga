"use client";

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
        <div className="fixed flex flex-row top-0 z-50 w-full h-16 bg-transparent backdrop-blur-md shadow-md border-solid border-b">
            <div className="flex flex-row items-center gap-2 ml-2">
                <Link href="/" className="">
                    <Image
                        src={resolvedTheme === "light" ? "/GymSagaDark.svg" : "/GymSagaLight.svg"}
                        width={40}
                        height={40}
                        alt="GymSaga Logo"
                    />
                </Link>
                <Link href="/" className="">
                    <h2 className="text-xl font-extrabold tracking-tight">GymSaga</h2>
                </Link>
            </div>
            <div className="flex flex-grow justify-center items-center">
                <Navbar />
            </div>
            <div className="flex flex-row items-center gap-2 mr-2">
                <CreatePostDialog />
                <SettingsButton />
                <ModeToggle />
            </div>
        </div>
    );
}