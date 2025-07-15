'use client';

import Link from 'next/link';

import CommandBar from '@/components/command-bar';
import CreatePostDialog from '@/components/create-post-dialog';
import NavbarMenu from '@/components/navigation-bar-menu';
import SettingsButton from '@/components/settings-button';
import SheetMenu from '@/components/sheet-menu';
import GymSagaSquare from '@/public/GymSagaSquare';

export default function NavigationBar() {
  return (
    <div className="fixed top-0 z-50 flex h-14 w-full flex-row border-b border-solid bg-transparent shadow-md backdrop-blur-md">
      <div className="ml-2 flex flex-row items-center gap-2">
        <Link className="transition duration-300 hover:scale-110 hover:rotate-6" href="/">
          <GymSagaSquare />
        </Link>
        <Link className="group relative" href="/">
          <h2 className="text-xl font-extrabold tracking-tight">GymSaga</h2>
          <span className="absolute -bottom-0.5 left-0 block h-0.5 w-full scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100 dark:bg-white"></span>
        </Link>
      </div>
      <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform items-center md:flex">
        <NavbarMenu />
      </div>
      <div className="mr-2 ml-auto flex hidden flex-row items-center gap-2 md:flex">
        <CommandBar />
        <CreatePostDialog />
        <SettingsButton />
      </div>
      <div className="mr-2 ml-auto flex flex-row items-center gap-2 md:hidden">
        <SheetMenu />
      </div>
    </div>
  );
}
