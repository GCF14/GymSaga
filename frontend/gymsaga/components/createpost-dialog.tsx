import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import React from "react";
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { createPortal } from "react-dom";
import DefaultDropZone from "./drop-zone";
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
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function CreatePostDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <span className="material-symbols-rounded">
                        post_add
                    </span>
                    Post
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[750px]">
                <DialogHeader>
                    <DialogTitle>
                        Create Post
                    </DialogTitle>
                </DialogHeader>
                <DefaultDropZone />
                <Textarea className="mt-4" placeholder="Write something..."></Textarea>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={() => {toast.success("Post created successfully!")}}>
                            Post
                        </Button>
                    </DialogClose>                
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}