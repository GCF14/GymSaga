import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"  
import { Button } from "@/components/ui/button"
import EditPostDialog from "@/components/edit-post-dialog"; 
import { useState } from "react";


export default function MoreMenu() {
    const handleDeletePost = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (confirmDelete) {
            alert("Post deleted successfully!");
            
        }
    }
    const [isEditOpen, setIsEditOpen] = useState(false);


    return(
        <>
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
                <DropdownMenuItem onClick={() => {setIsEditOpen(true)}}>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeletePost}>
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {}}>
                    Report
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <EditPostDialog isOpen={isEditOpen} setIsOpen={setIsEditOpen} />
        </>
        
    )
}