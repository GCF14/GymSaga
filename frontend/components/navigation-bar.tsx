"use client";

import NavbarMenu from "@/components/navigation-bar-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "next-themes";
import SettingsButton from "@/components/settings-button";
import Link from "next/link";
import CreatePostDialog from "./create-post-dialog";
import GymSagaSquare from "@/public/GymSagaSquare";
import SheetMenu from "./sheet-menu";

export default function NavigationBar() {
    const { resolvedTheme } = useTheme();

    return (
        <div className="fixed flex flex-row top-0 z-50 w-full h-16 bg-transparent backdrop-blur-md shadow-md border-solid border-b">
            <div className="flex flex-row items-center gap-2 ml-2">
                <Link href="/" className="">
                    <GymSagaSquare />
                </Link>
                <Link href="/" className="">
                    <h2 className="text-xl font-extrabold tracking-tight">GymSaga</h2>
                </Link>
            </div>
            <div className="hidden md:flex flex grow justify-center items-center">
                <NavbarMenu />
            </div>
            <div className="hidden md:flex flex flex-row items-center gap-2 mr-2">
                <CreatePostDialog />
                <SettingsButton />
                <ModeToggle />
            </div>
            <div className="md:hidden flex flex-row items-center ml-auto gap-2 mr-2">
                <SheetMenu />
            </div>
        </div>
    );
}