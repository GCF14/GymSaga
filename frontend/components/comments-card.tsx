"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import MoreMenu from "@/components/dropdown-menu";
import NestedComments from "@/components/nested-comments";
import { Textarea } from "@/components/ui/textarea";
import LikeCommentShareBar from "@/components/like-comment-share-bar";
import AttachmentButton from "@/components/attachment-button";
import { CircleUser, SendHorizonal } from "lucide-react"

interface CommentCardProps {
    onClose: () => void;
}

export default function CommentCard({ onClose }: CommentCardProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [isNestedCommentVisible, setIsNestedCommentVisible] = useState(false);
    const [files, setFiles] = useState<File[]>([])
    
    const handleFilesChange = (newFiles: File[]) => {
        setFiles(newFiles)
        console.log("Files updated:", newFiles)
    }

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    const handleNestedComments = () => {
        setIsNestedCommentVisible(!isNestedCommentVisible);
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <Card className="relative z-60 w-full m-4 md:w-1/2 h-3/4 flex flex-col">
                <CardHeader>
                    <CardTitle>Comments</CardTitle>
                    <CardDescription>Contribute your ideas and connect with others!</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <Avatar className="w-10 h-10 mr-2">
                                    <AvatarImage src="/Logo.png" alt="Avatar" />
                                    <AvatarFallback>
                                        <CircleUser />
                                    </AvatarFallback>
                                </Avatar>
                                <CardTitle>GerardChristian05</CardTitle>
                            </div>
                            <MoreMenu />
                        </div>
                        <p className="ml-12 mb-2">That's crazy, it actually works!</p>
                        <LikeCommentShareBar className="ml-10" onClick={() => { handleLike(); handleNestedComments(); }} />
                        {isNestedCommentVisible && <NestedComments />}
                        {isNestedCommentVisible && <NestedComments />}
                        {isNestedCommentVisible && <NestedComments />}
                        <Separator className="mb-4" />
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="w-full flex flex-row gap-2 justify-center items-center">
                        <AttachmentButton onFilesChange={handleFilesChange} maxFiles={1} />
                        <Textarea placeholder="Write a comment..." rows={1} className="flex-grow" />
                        <Button size="icon" className="px-4">
                            <SendHorizonal />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>,
        document.body
    );
}