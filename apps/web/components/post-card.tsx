'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import React from 'react';

import CommentCard from '@/components/comments-card';
import MoreMenu from '@/components/dropdown-menu';
import LikeCommentShareBar from '@/components/like-comment-share-bar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { PostCardProps } from '@/types/post';

export default function PostCard({
  username,
  content,
  profilePicture,
  bio,
  date,
  postId,
  numOfLikes,
  likedBy,
  currentUser,
}: PostCardProps) {
  const [showCommentCard, setShowCommentCard] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const displayUsername = username ? (username.startsWith('@') ? username.slice(1) : username) : '';

  const handleComment = () => {
    setShowCommentCard(true);
  };

  const handleCloseCommentCard = () => {
    setShowCommentCard(false);
  };

  const handleCardClick = () => {
    setIsDialogOpen(true);
  };

  const renderContent = (item: PostCardProps['content'][0], index: number) => {
    if (item.type === 'text' && item.data) {
      return (
        <p key={`${postId || ''}-${index}`} className="mb-4">
          {item.data}
        </p>
      );
    } else if (item.type === 'image' && item.data) {
      return (
        <div key={`${postId || ''}-${index}`} className="mt-2 mb-4 flex justify-center">
          <Image
            alt={`Posted by ${displayUsername || 'user'}`}
            className="max-h-96 w-auto rounded-lg object-contain"
            height={300}
            src={item.data}
            unoptimized={item.data.startsWith('http')}
            width={500}
          />
        </div>
      );
    } else if (item.type === 'video' && item.data) {
      return (
        <div key={`${postId || ''}-${index}`} className="mt-2 mb-4 flex justify-center">
          <video controls className="max-h-96 w-auto rounded-lg" src={item.data} />
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between">
            <div className="flex h-full w-full items-center">
              <Avatar className="mr-4 h-10 w-10">
                <AvatarImage alt={`${displayUsername}'s avatar`} src={profilePicture} />
                <AvatarFallback>
                  {displayUsername ? displayUsername.charAt(0).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
              <CardTitle>
                <HoverCard>
                  <HoverCardTrigger asChild className="hover-underline">
                    <Link href={`/${encodeURIComponent(displayUsername)}`}>{displayUsername}</Link>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage alt={`${displayUsername}'s avatar`} src={profilePicture} />
                        <AvatarFallback>
                          {displayUsername ? displayUsername.charAt(0).toUpperCase() : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{username}</h4>
                        <p className="text-sm">{bio || 'No bio available'}</p>
                        <div className="flex items-center pt-2">
                          <span className="text-muted-foreground text-xs">{date}</span>
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
          className="hover:bg-accent/5 cursor-pointer transition-colors"
          onClick={handleCardClick}
        >
          <CardContent>
            {Array.isArray(content)
              ? content.map((item, index) => renderContent(item, index))
              : null}
          </CardContent>
        </div>
        <CardFooter>
          <LikeCommentShareBar
            currentUsername={currentUser?.username || ''}
            initialLikeCount={numOfLikes || 0}
            initialLikedBy={likedBy || []}
            postId={postId || ''}
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
  );
}
