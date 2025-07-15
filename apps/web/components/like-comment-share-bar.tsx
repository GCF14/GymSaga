import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';

interface LikeCommentShareBarProps {
  postId: string;
  initialLikeCount: number;
  initialLikedBy: string[];
  currentUsername: string;
  onCommentClick: () => void;
  className?: string;
}

export default function LikeCommentShareBar({
  postId,
  initialLikeCount,
  initialLikedBy,
  currentUsername,
  onCommentClick,
  className,
}: LikeCommentShareBarProps) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [likedBy, setLikedBy] = useState<string[]>(initialLikedBy || []);
  const [isLoading, setIsLoading] = useState(false);

  const isLiked = Array.isArray(likedBy) && likedBy.includes(currentUsername);

  const handleLike = async () => {
    if (isLoading) {
      return;
    }

    const wasLiked = isLiked;
    const newLikeCount = wasLiked ? likeCount - 1 : likeCount + 1;
    const newLikedBy = wasLiked
      ? (likedBy || []).filter((user) => user !== currentUsername)
      : [...(likedBy || []), currentUsername];

    setLikeCount(newLikeCount);
    setLikedBy(newLikedBy);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: currentUsername,
          action: wasLiked ? 'unlike' : 'like',
        }),
      });

      if (!response.ok) {
        setLikeCount(likeCount);
        setLikedBy(likedBy);
        toast.error('Failed to update like');
      }
    } catch (error) {
      setLikeCount(likeCount);
      setLikedBy(likedBy);
      console.error('Error updating like:', error);
      toast.error('Failed to update like');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setLikeCount(initialLikeCount);
    setLikedBy(initialLikedBy || []);
  }, [initialLikeCount, initialLikedBy]);

  return (
    <div className={`mb-4 flex items-start gap-2 ${className}`}>
      <div className="flex min-h-[48px] flex-col items-center">
        <Toggle className="mb-1" onClick={handleLike}>
          <span
            className={`material-symbols-rounded ${isLiked ? 'material-symbols-rounded filled' : ''}`}
          >
            favorite
          </span>
        </Toggle>
        <span className="flex h-4 items-center text-xs text-gray-500">
          {likeCount > 0 ? likeCount : ''}
        </span>
      </div>

      <div className="flex min-h-[48px] flex-col items-center">
        <Button className="hover-button mb-1 px-2" variant="ghost" onClick={onCommentClick}>
          <span className="material-symbols-rounded">mode_comment</span>
        </Button>
        <div className="h-4"></div>
      </div>

      <div className="flex min-h-[48px] flex-col items-center">
        <Button
          className="hover-button mb-1 px-2"
          variant="ghost"
          onClick={() => {
            navigator.clipboard
              .writeText(window.location.href)
              .then(() => {
                toast('Link Copied! 🎉', {
                  description: 'Share it with your friends and let them join the fun!',
                  action: {
                    label: 'Close',
                    onClick: () => toast.dismiss(),
                  },
                });
              })
              .catch((err) => {
                console.error('Failed to copy: ', err);
              });
          }}
        >
          <span className="material-symbols-rounded">share</span>
        </Button>
        <div className="h-4"></div>
      </div>
    </div>
  );
}
