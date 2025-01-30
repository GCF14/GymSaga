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
import CommentCard from "@/components/comments-card"

interface PostCardProps {
    username: string;
    content: React.ReactNode;
}

export default function PostCard({ username, content }: PostCardProps) {
    const [isLiked, setIsLiked] = React.useState(false);
    const [showCommentCard, setShowCommentCard] = React.useState(false);

    const handleComment = () => {
        setShowCommentCard(true);
    }

    const handleCloseCommentCard = () => {
        setShowCommentCard(false);
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
    }

    const date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center h-full w-full">
            <       Avatar className="w-10 h-10 mr-4">
                        <AvatarImage src="/Logo.png" alt="Avatar" />
                        <AvatarFallback>
                            <span className="material-symbols-rounded medium">
                                account_circle
                            </span>
                        </AvatarFallback>
                    </Avatar>
                <CardTitle>{username}</CardTitle>
                </div>
                <CardDescription>{date}</CardDescription>
            </CardHeader>
            <CardContent>
                {content}
            </CardContent>
            <CardFooter>
                <div className="flex items-center">
                    <Toggle onClick={handleLike}>
                    <span className={`material-symbols-rounded ${isLiked ? 'material-symbols-rounded filled' : ''}`}>
                            favorite
                        </span>
                    </Toggle>
                    <Button variant="ghost" className="hover-button px-2" onClick={handleComment}>
                        <span className="material-symbols-rounded">
                            mode_comment
                        </span>
                    </Button>
                    <Button
                    variant="ghost"
                    className="hover-button px-2"
                    onClick={() => {
                        navigator.clipboard.writeText(window.location.href).then(() => {
                            toast("Link Copied! 🎉", {
                                description: "Share it with your friends and let them join the fun!",
                                action: {
                                    label: "Close",
                                    onClick: () => toast.dismiss(),
                                },
                            });
                        }).catch(err => {
                            console.error('Failed to copy: ', err);
                        });
                    }}>
                        <span className="material-symbols-rounded">
                            share
                        </span>
                    </Button>
                </div>
            </CardFooter>
            {showCommentCard && <CommentCard onClose={handleCloseCommentCard} />}
        </Card>
    )
}