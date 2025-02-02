import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"  
import { Button } from "@/components/ui/button"

export default function MoreMenu() {
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover-button">
                    <span className="material-symbols-rounded">
                        more_vert
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => {}}>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {}}>
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {}}>
                    Report
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
