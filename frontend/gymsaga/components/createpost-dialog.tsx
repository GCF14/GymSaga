import React from "react";
import { Button } from "@/components/ui/button"
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
  } from "@/components/ui/dialog"
import { RainbowButton } from "@/components/ui/rainbow-button";

export default function CreatePostDialog() {
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
                        <Button variant="outline" size="icon" className="hover-button">
                            <span className="material-symbols-rounded">
                                attachment
                            </span>
                        </Button>
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