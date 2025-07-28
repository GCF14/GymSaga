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

export default function CreatePostDialog() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState('');

  const handlePostButton = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('username', localStorage.getItem('username') || '');
    formData.append('numOfLikes', '0');
    formData.append('likedBy', JSON.stringify([]));
    if (text) {
      formData.append('text', text);
    }
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something went wrong.');
      }

      toast.success('Post created successfully!');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`Failed to create post: ${err.message}`);
      } else {
        toast.error('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
      setText('');
      setFiles([]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <RainbowButton className="h-8 w-20 rounded-md transition duration-300 hover:scale-105">
          <span className="material-symbols-rounded">post_add</span>
          <span className="ml-2 text-sm">Post</span>
        </RainbowButton>
      </DialogTrigger>
      <DialogContent className="min-w-[750px]">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>
            Share your thoughts with others!
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Textarea
            placeholder="Write something..."
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <DialogFooter>
          <div className="flex w-full justify-between">
            <AttachmentButton
              maxFiles={3}
              onFilesChange={(selected) => setFiles(selected.slice(0, 3))}
            />
            <DialogClose asChild className="flex justify-end">
              <Button disabled={loading} onClick={handlePostButton}>
                {loading ? 'Posting...' : 'Post'}
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
