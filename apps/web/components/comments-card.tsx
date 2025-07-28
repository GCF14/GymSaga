'use client';

import { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import AttachmentButton from './attachment-button';
import MoreMenu from './dropdown-menu';
import LikeCommentShareBar from './like-comment-share-bar';
import NestedComments from './nested-comments';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';

interface CommentCardProps {
  onClose: () => void;
}

export default function CommentCard({ onClose }: CommentCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isNestedCommentVisible, setIsNestedCommentVisible] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
    console.log('Files updated:', newFiles);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleNestedComments = () => {
    setIsNestedCommentVisible(!isNestedCommentVisible);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <Card className="relative z-60 m-4 flex h-3/4 w-full flex-col md:w-1/2">
        <CardHeader>
          <CardTitle>Comments</CardTitle>
          <CardDescription>
            Contribute your ideas and connect with others!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <div className="flex items-center">
                <Avatar className="mr-2 h-10 w-10">
                  <AvatarImage alt="Avatar" src="/Logo.png" />
                  <AvatarFallback>
                    <span className="material-symbols-rounded large">
                      account_circle
                    </span>
                  </AvatarFallback>
                </Avatar>
                <CardTitle>GerardChristian05</CardTitle>
              </div>
              <MoreMenu />
            </div>
            <p className="mb-2 ml-12">That's crazy, it actually works!</p>
            <LikeCommentShareBar
              className="ml-10"
              onClick={() => {
                handleLike();
                handleNestedComments();
              }}
            />
            {isNestedCommentVisible && <NestedComments />}
            {isNestedCommentVisible && <NestedComments />}
            {isNestedCommentVisible && <NestedComments />}
            <Separator className="mb-4" />
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full flex-row items-center justify-center gap-2">
            <AttachmentButton maxFiles={1} onFilesChange={handleFilesChange} />
            <Textarea
              className="flex-grow"
              placeholder="Write a comment..."
              rows={1}
            />
            <Button className="px-2" size="icon">
              <span className="material-symbols-rounded">send</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>,
    document.body,
  );
}
