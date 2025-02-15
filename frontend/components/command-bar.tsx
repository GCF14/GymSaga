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
import React, { useCallback } from "react"
import { Button } from "./ui/button"
import { Kbd } from "@/components/ui/kbd"

export default function CommandBar() {
    const [open, setOpen] = React.useState(false)
    const [input, setInput] = React.useState("")
 
    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          setOpen((open) => !open)
        }
      }
      document.addEventListener("keydown", down)
      return () => document.removeEventListener("keydown", down)
    }, [])
   
    return (
        <div>
            <Button className="inline-flex items-center gap-2 w-48 h-8 p-2 pr-1 cursor-pointer" variant="outline" onClick={() => setOpen(true)}>
                <span className="material-symbols-rounded small">search</span>
                <p className="text-xs">Search...</p>
                <Kbd variant="outline" className="pointer-events-none ml-auto">
                    <span className="text-xs">⌘</span>
                    <p className="text-sm">K</p>
                </Kbd>
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
                    <CommandGroup heading="Suggestions">
                        <CommandItem>Home</CommandItem>
                        <CommandItem>Map</CommandItem>
                        <CommandItem>Social Link</CommandItem>
                        <CommandItem>Profile</CommandItem>
                    </CommandGroup>
                    </CommandList>
                </CommandDialog>
            </Button>
        </div>
    )
}