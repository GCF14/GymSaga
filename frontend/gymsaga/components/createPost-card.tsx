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

interface CreatePostCardProps {
    onClose: () => void;
}

export default function CreatePostCard({ onClose }: CreatePostCardProps) {
    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <Card className="relative z-60 w-1/2">
                <CardHeader>
                    <h3 className="border-b pb-2 scroll-m-20 text-2xl font-semibold tracking-tight">
                        Create Post
                    </h3>
                </CardHeader>
                <CardContent>
                    <DefaultDropZone />
                    <Textarea className="mt-4" placeholder="Write something..."></Textarea>
                </CardContent>
                <CardFooter>
                    <div className="w-full flex items-center justify-between">
                        <Button variant="destructive" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                toast.success("Post created successfully!");
                                onClose();
                            }}
                        >
                            Post
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>,
        document.getElementById("portal-root")!
    );
}