import { useState } from 'react';

import EditPostDialog from '@/components/edit-post-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function MoreMenu() {
  const handleDeletePost = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      alert('Post deleted successfully!');
    }
  };
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="hover-button" size="icon" variant="ghost">
            <span className="material-symbols-rounded">more_vert</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              setIsEditOpen(true);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeletePost}>Delete</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => {}}>Report</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditPostDialog isOpen={isEditOpen} setIsOpen={setIsEditOpen} />
    </>
  );
}
