import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"  
import { Button } from "@/components/ui/button"
import { EllipsisVertical } from "lucide-react"

export default function MoreMenu() {
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover-button">
                    <EllipsisVertical />
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