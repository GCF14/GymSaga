'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { Kbd } from '@/components/ui/kbd';
import { useLogout } from '@/hooks/useLogout';

export default function CommandBar() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const router = useRouter();
  const { logout } = useLogout();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prevOpen) => !prevOpen);
      }
    };
    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = useCallback(
    (path: string) => {
      setOpen(false);
      router.push(path);
    },
    [router],
  );

  return (
    <>
      <Button
        className="group inline-flex h-8 w-22 cursor-pointer items-center gap-2 pr-0 pl-2 transition-all duration-300 hover:w-36"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        <span className="material-symbols-rounded small">search</span>
        <span className="inline-block max-w-0 overflow-hidden whitespace-nowrap transition-[max-width] duration-300 group-hover:max-w-[100px]">
          <span className="text-xs opacity-0 transition-opacity delay-150 group-hover:opacity-100">
            Search...
          </span>
        </span>
        <Kbd className="mr-0.5 ml-auto" variant="outline">
          <span className="text-xs">⌘</span>
          <span className="text-sm">K</span>
        </Kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          value={input}
          onValueChange={useCallback((value: string) => setInput(value), [])}
        />
        <CommandList>
          <CommandEmpty>
            <div className="flex flex-row items-center justify-center gap-2">
              <span className="material-symbols-rounded">search</span>
              Searching for {input}
            </div>
          </CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem className="items-center" onSelect={() => handleSelect('/')}>
              <span className="material-symbols-rounded">home</span>
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect('/map')}>
              <span className="material-symbols-rounded">map</span>
              <span>Map</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect('/social-link')}>
              <span className="material-symbols-rounded">group</span>
              <span>Social Link</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect(`/${username}`)}>
              <span className="material-symbols-rounded">person</span>
              <span>Profile</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => handleSelect('/settings')}>
              <span className="material-symbols-rounded">settings</span>
              <span>Settings</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                handleSelect('/login');
                logout();
              }}
            >
              <span className="material-symbols-rounded">logout</span>
              <span>Logout</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
