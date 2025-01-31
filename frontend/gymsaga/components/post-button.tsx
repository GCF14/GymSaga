import Link from 'next/link';
import { Button } from './ui/button';
import CreatePostCard from './createPost-card';
import React from 'react';

export default function PostButton() {
  const [showCreatePostCard, setShowCreatePostCard] = React.useState(false);

  const handleCreatePost = () => {
    setShowCreatePostCard(true);
  }

  const handleCloseCreatePostCard = () => {
    setShowCreatePostCard(false);
  };

  return (
    <>
      <Button className="mr-4" onClick={handleCreatePost}>
        <span className="material-symbols-rounded">
          post_add
        </span>
        Post
      </Button>
      {showCreatePostCard && <CreatePostCard onClose={handleCloseCreatePostCard} />}
    </>
  );
}