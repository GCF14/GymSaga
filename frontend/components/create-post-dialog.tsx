"use client"

import React, { useState } from "react";
import { Button } from "./ui/button"
import { toast } from "sonner"
import { Textarea } from "./ui/textarea";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "./ui/dialog"
import { RainbowButton } from "./magicui/rainbow-button";
import AttachmentButton from "./attachment-button";

export default function CreatePostDialog() {
    const [files, setFiles] = useState<File[]>([])

    const handleFilesChange = (newFiles: File[]) => {
      setFiles(newFiles)
      console.log("Files updated:", newFiles)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <RainbowButton className="rounded-md h-9 w-24">
                    <span className="material-symbols-rounded">
                        post_add
                    </span>
                    <p className="ml-2">
                        Post
                    </p>
                </RainbowButton>
            </DialogTrigger>
            <DialogContent className="min-w-[750px]">
                <DialogHeader>
                    <DialogTitle>
                        Create Post
                    </DialogTitle>
                    <DialogDescription>
                        Share your thoughts with others!
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <Textarea placeholder="Write something..." rows={10}></Textarea>
                </div>
                <DialogFooter>
                    <div className="w-full flex justify-between">
                        <AttachmentButton onFilesChange={handleFilesChange} maxFiles={5} />
                        <DialogClose asChild className="flex justify-end">
                            <Button onClick={() => {toast.success("Post created successfully!")}}>
                                Post
                            </Button>
                        </DialogClose>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}