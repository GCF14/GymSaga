import Link from 'next/link';

import { ModeToggle } from '@/components/mode-toggle';
import SettingsButton from '@/components/settings-button';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import CreatePostDialog from './create-post-dialog';

export default function SheetMenu() {
  const menuItems = [
    { icon: 'post_add', label: 'Posts', href: '/posts' },
    { icon: 'home', label: 'Home', href: '/' },
    { icon: 'map', label: 'Map', href: '/map' },
    { icon: 'group', label: 'Social Link', href: '/social-link' },
    { icon: 'person', label: 'Profile', href: '/profile' },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <span className="material-symbols-rounded">menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-2">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="text-2xl">Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex grow flex-col gap-4">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <Button variant="ghost">
                <span className="material-symbols-rounded">{item.icon}</span>
                <span className="ml-2 text-xl">{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
        <SheetFooter className="flex flex-row justify-start gap-2 border-t p-4">
          <CreatePostDialog />
          <SettingsButton />
          <ModeToggle />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
