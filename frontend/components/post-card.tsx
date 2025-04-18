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
import { PostCardProps } from "@/types/post";


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

    const renderContent = (item: PostCardProps['content'][0], index: number) => {
        if (item.type === 'text') {
            return <p key={index} className="mb-4">{item.data}</p>;
        } 
        else if (item.type === 'image') {
            return (
                <div key={index} className="mt-2 mb-4 flex justify-center">
                    <img 
                        src={item.data} 
                        alt={`Posted by ${username}`} 
                        className="rounded-lg max-h-96 w-auto" 
                    />
                </div>
            );
        }
        else if (item.type === 'video') {
            return (
                <div key={index} className="mt-2 mb-4 flex justify-center">
                    <video 
                        src={item.data} 
                        controls
                        className="rounded-lg max-h-96 w-auto" 
                    />
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex justify-between">
                    <div className="flex items-center h-full w-full">
                        <Avatar className="w-10 h-10 mr-4">
                            <AvatarImage src="/Logo.png" alt="Avatar" />
                            <AvatarFallback>
                                <span className="material-symbols-rounded medium">
                                    account_circle
                                </span>
                            </AvatarFallback>
                        </Avatar>
                    <CardTitle>
                        <HoverCard>
                            <HoverCardTrigger asChild className="hover-underline">
                                <Link href={`/${username}`}>
                                    {username}
                                </Link>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                                <div className="flex justify-between space-x-4">
                                <Avatar>
                                    <AvatarImage src="/Logo.png" />
                                    <AvatarFallback>
                                        <span className="material-symbols-rounded medium">
                                            account_circle
                                        </span>
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
                {content.map((item, index) => renderContent(item, index))}
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