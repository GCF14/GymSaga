import React from 'react';

import Link from 'next/link';

import MoreMenu from '@/components/dropdown-menu';
import LikeCommentShareBar from '@/components/like-comment-share-bar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function NestedComments() {
  const [isLiked, setIsLiked] = React.useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const username = 'GerardChristian05';

  return (
    <div className="ml-10 flex flex-col">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Avatar className="mr-2 h-7 w-7">
            <AvatarImage alt="Avatar" src="/Logo.png" />
            <AvatarFallback>
              <span className="material-symbols-rounded large">
                account_circle
              </span>
            </AvatarFallback>
          </Avatar>
          OngPagong04
        </div>
        <MoreMenu />
      </div>
      <p className="mb-2 ml-9">
        <Link className="font-bold hover:underline" href={username}>
          @{username}
        </Link>{' '}
        This is a subcomment!
      </p>
      <LikeCommentShareBar className="ml-7" onClick={handleLike} />
    </div>
  );
}
