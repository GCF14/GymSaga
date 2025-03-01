"use client"

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
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import React from "react";
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import CommentCard from "@/components/comments-card" 
import MoreMenu from "@/components/dropdown-menu"
import Link from "next/link";
import { CircleUser, Heart, MessageSquare, ExternalLink } from "lucide-react"

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
                <div className="flex justify-between">
                    <div className="flex items-center h-full w-full">
                        <Avatar className="w-10 h-10 mr-4">
                            <AvatarImage src="/Logo.png" alt="Avatar" />
                            <AvatarFallback>
                                <CircleUser />
                            </AvatarFallback>
                        </Avatar>
                    <CardTitle>
                        <HoverCard>
                            <HoverCardTrigger asChild className="hover-underline">
                                <Link href={`/${username}`} passHref>
                                    {username}
                                </Link>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                                <div className="flex justify-between space-x-4">
                                <Avatar>
                                    <AvatarImage alt="User" src="/Logo.png" />
                                    <AvatarFallback>
                                        <CircleUser />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold">
                                        {username}
                                    </h4>
                                    <p className="text-sm">
                                    The GymSaga CEO and Co-Founder. Working on making fitness fun and accessible for everyone. 🏋️‍♂️💪
                                    </p>
                                    <div className="flex items-center pt-2">
                                    <span className="text-xs text-muted-foreground">
                                        Joined June 2005
                                    </span>
                                    </div>
                                </div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </CardTitle>
                    </div>
                    <MoreMenu />
                </div>
                <CardDescription>{date}</CardDescription>
            </CardHeader>
            <CardContent>
                {content}
            </CardContent>
            <CardFooter>
                <div className="flex items-center">
                    <Toggle onClick={handleLike}>
                        <Heart color={isLiked ? "red" : "currentColor"} />
                    </Toggle>
                    <Button variant="ghost" size="icon" className="hover-button" onClick={handleComment}>
                        <MessageSquare />
                    </Button>
                    <Button
                    variant="ghost"
                    size="icon"
                    className="hover-button"
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
                        <ExternalLink />
                    </Button>
                </div>
            </CardFooter>
            {showCommentCard && <CommentCard onClose={handleCloseCommentCard} />}
        </Card>
    )
}