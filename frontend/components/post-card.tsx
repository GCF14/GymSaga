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
} from "@/components/ui/avatar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import React from "react"
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import CommentCard from "@/components/comments-card" 
import MoreMenu from "@/components/dropdown-menu"
import Link from "next/link"
import Image from "next/image"
import { PostCardProps } from "@/types/post"

export default function PostCard({ username, content, profilePicture, bio, date, postId }: PostCardProps) {
    const [isLiked, setIsLiked] = React.useState(false)
    const [showCommentCard, setShowCommentCard] = React.useState(false)

    // Remove @ from username if present
    const displayUsername = username ? (username.startsWith('@') ? username.slice(1) : username) : ''

    const handleComment = () => {
        setShowCommentCard(true)
    }

    const handleCloseCommentCard = () => {
        setShowCommentCard(false)
    }

    const handleLike = () => {
        setIsLiked(!isLiked)
    }

    const renderContent = (item: PostCardProps['content'][0], index: number) => {
        if (item.type === 'text' && item.data) {
            return <p key={`${postId || ''}-${index}`} className="mb-4">{item.data}</p>
        } 
        else if (item.type === 'image' && item.data) {
            return (
                <div key={`${postId || ''}-${index}`} className="mt-2 mb-4 flex justify-center">
                    <Image
                        src={item.data} 
                        alt={`Posted by ${displayUsername || 'user'}`}
                        width={500}
                        height={300}
                        unoptimized={item.data.startsWith('http')}
                        className="rounded-lg max-h-96 w-auto object-contain" 
                    />
                </div>
            )
        }
        else if (item.type === 'video' && item.data) {
            return (
                <div key={`${postId || ''}-${index}`} className="mt-2 mb-4 flex justify-center">
                    <video 
                        src={item.data} 
                        controls
                        className="rounded-lg max-h-96 w-auto" 
                    />
                </div>
            )
        }
        return null
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex justify-between">
                    <div className="flex items-center h-full w-full">
                        <Avatar className="w-10 h-10 mr-4">
                            <AvatarImage 
                                src={profilePicture} 
                                alt={`${displayUsername}'s avatar`} 
                            />
                            <AvatarFallback>
                                {displayUsername ? displayUsername.charAt(0).toUpperCase() : "U"}
                            </AvatarFallback>
                        </Avatar>
                        <CardTitle>
                            <HoverCard>
                                <HoverCardTrigger asChild className="hover-underline">
                                    <Link href={`/${encodeURIComponent(displayUsername)}`}>
                                        {displayUsername}
                                    </Link>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                    <div className="flex justify-between space-x-4">
                                        <Avatar>
                                            <AvatarImage 
                                                src={profilePicture} 
                                                alt={`${displayUsername}'s avatar`} 
                                            />
                                            <AvatarFallback>
                                                {displayUsername ? displayUsername.charAt(0).toUpperCase() : "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-semibold">
                                                {username}
                                            </h4>
                                            <p className="text-sm">
                                                {bio || "No bio available"}
                                            </p>
                                            <div className="flex items-center pt-2">
                                                <span className="text-xs text-muted-foreground">
                                                    {date}
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
                {Array.isArray(content) ? content.map((item, index) => renderContent(item, index)) : null}
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
                        }}
                    >
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