'use client';

import React, { useState } from 'react';

import { toast } from 'sonner';

import AttachmentButton from '@/components/attachment-button';
import { RainbowButton } from '@/components/magicui/rainbow-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface EditPostDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditPostDialog({
  isOpen,
  setIsOpen,
}: EditPostDialogProps) {
  const [text, setText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
    console.log('Files updated:', newFiles);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="min-w-[750px]">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>
            Share your thoughts with others!
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Textarea placeholder="Write something..." rows={10}></Textarea>
        </div>
        <DialogFooter>
          <div className="flex w-full justify-between">
            <AttachmentButton maxFiles={5} onFilesChange={handleFilesChange} />
            <DialogClose asChild className="flex justify-end">
              <Button
                onClick={() => {
                  toast.success('Post created successfully!');
                }}
              >
                Post
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
