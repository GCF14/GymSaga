"use client";

import NavbarMenu from "@/components/navigation-bar-menu";
import SettingsButton from "@/components/settings-button";
import Link from "next/link";
import CreatePostDialog from "@/components/create-post-dialog";
import GymSagaSquare from "@/public/GymSagaSquare";
import SheetMenu from "@/components/sheet-menu";
import CommandBar from "@/components/command-bar";

export default function NavigationBar() {
  return (
    <div className="fixed flex flex-row top-0 z-50 w-full h-14 bg-transparent backdrop-blur-md shadow-md border-solid border-b">
      <div className="flex flex-row items-center gap-2 ml-2">
        <Link
          href="/"
          className="transition duration-300 hover:scale-110 hover:rotate-6"
        >
          <GymSagaSquare />
        </Link>
        <Link href="/" className="relative group">
          <h2 className="text-xl font-extrabold tracking-tight">GymSaga</h2>
          <span className="absolute left-0 -bottom-0.5 block h-0.5 w-full bg-black dark:bg-white scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
        </Link>
      </div>
      <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center">
        <NavbarMenu />
      </div>
      <div className="hidden md:flex flex flex-row items-center gap-2 ml-auto mr-2">
        <CommandBar />
        <CreatePostDialog />
        <SettingsButton />
      </div>
      <div className="md:hidden flex flex-row items-center ml-auto gap-2 mr-2">
        <SheetMenu />
      </div>
    </div>
  );
}
