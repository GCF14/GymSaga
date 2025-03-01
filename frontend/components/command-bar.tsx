"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
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
  } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { useLogout } from "@/hooks/useLogout"
import CreatePostDialog from "@/components/create-post-dialog"
import { useTheme } from "next-themes"
import { Search, House, Map, Users, User, SquarePen, Contrast, Settings, LogOut } from "lucide-react"

export default function CommandBar() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const router = useRouter()
  const { logout } = useLogout()
  const [username, setUsername] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
      setUsername(localStorage.getItem("username"))
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prevOpen) => !prevOpen)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = useCallback(
    (path: string) => {
      setOpen(false)
      router.push(path)
    },
    [router]
  )

  return (
    <>
        <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="group inline-flex items-center transition-all duration-300 gap-2 w-22 hover:w-36 h-8 pl-2 pr-0 cursor-pointer"
        >
            <Search />
            <span className="inline-block overflow-hidden whitespace-nowrap transition-[max-width] duration-300 max-w-0 group-hover:max-w-[100px]">
                <span className="text-xs transition-opacity delay-150 opacity-0 group-hover:opacity-100">
                    Search...
                </span>
            </span>
            <Kbd variant="outline" className="ml-auto mr-0.5">
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
              <Search />
              Searching for {input}
            </div>
          </CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => handleSelect("/")} className="items-center">
              <House />
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("/map")}>
              <Map />
              <span>Map</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("/social-link")}>
              <Users />
              <span>Social Link</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect(`/${username}`)}>
              <User />
              <span>Profile</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => { setDialogOpen(true); setOpen(false); }}>
              <SquarePen />
              <span>Create Post</span>
            </CommandItem>
            <CommandItem onSelect={() => {setTheme(theme === "light" ? "dark" : "light"); setOpen(false);}}>
              <Contrast />
              <span>Mode</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => handleSelect("/settings")}>
              <Settings />
              <span>Settings</span>
            </CommandItem>
            <CommandItem onSelect={() => {
                handleSelect("/login");
                logout();
            }}>
              <LogOut />
              <span>Logout</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <CreatePostDialog hideTrigger open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  )
}
