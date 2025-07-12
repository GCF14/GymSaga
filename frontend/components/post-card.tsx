"use client"

import { useState } from "react"
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
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import React from "react"
import CommentCard from "@/components/comments-card" 
import MoreMenu from "@/components/dropdown-menu"
import LikeCommentShareBar from "@/components/like-comment-share-bar"
import Link from "next/link"
import Image from "next/image"
import { PostCardProps } from "@/types/post"

export default function PostCard({ 
    username, 
    content, 
    profilePicture, 
    bio, 
    date, 
    postId,
    numOfLikes,
    likedBy,
    currentUser
}: PostCardProps) {
    const [showCommentCard, setShowCommentCard] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const displayUsername = username ? (username.startsWith('@') ? username.slice(1) : username) : ''

    const handleComment = () => {
        setShowCommentCard(true)
    }

    const handleCloseCommentCard = () => {
        setShowCommentCard(false)
    }

    const handleCardClick = () => {
        setIsDialogOpen(true)

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
        <>

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
                <div 
                    className="cursor-pointer hover:bg-accent/5 transition-colors"
                    onClick={handleCardClick}
                >
                    <CardContent>
                        {Array.isArray(content) ? content.map((item, index) => renderContent(item, index)) : null}
                    </CardContent>
                </div>
                <CardFooter>
                    <LikeCommentShareBar
                        postId={postId || ''}
                        initialLikeCount={numOfLikes || 0}
                        initialLikedBy={likedBy || []}
                        currentUsername={currentUser?.username || ''}
                        onCommentClick={handleComment}
                    />
                </CardFooter>
                {showCommentCard && <CommentCard onClose={handleCloseCommentCard} />}
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Post Details</DialogTitle>
                    </DialogHeader>
                </DialogContent>

            </Dialog>

        </>
        

    )
}