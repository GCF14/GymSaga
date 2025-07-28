'use client';

import { useEffect, useState, useCallback } from 'react';

import axios from 'axios';
import { io } from 'socket.io-client';

import { BlurFade } from '@/components/magicui/blur-fade';
import PostCard from '@/components/post-card';
import { useAuthContext } from '@/hooks/useAuthContext';
import { Post } from '@/types/post';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const { user } = useAuthContext();

  // Function to fetch posts - extracted so we can call it when needed
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      // Add a cache-busting parameter to prevent browser caching
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts?t=${Date.now()}`,
        { headers: { 'Cache-Control': 'no-cache' } },
      );
      const sortedPosts = data.sort((a: Post, b: Post) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

        return dateB - dateA;
      });
      setPosts(sortedPosts);
      setError(null);
    } catch (error) {
      console.error(
        'Error fetching posts:',
        error instanceof Error ? error.message : 'Unknown error',
      );
      setError('Could not load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(process.env.NEXT_PUBLIC_API_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });

    // Connection event handlers
    newSocket.on('connect', () => {
      console.log('Connected to server:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    newSocket.on('newPost', (data) => {
      console.log('New post received:', data);

      setPosts((currentPosts) => {
        const postExists = currentPosts.some(
          (post) => post._id === data.post._id,
        );
        if (postExists) {
          return currentPosts;
        }

        const updatedPosts = [data.post, ...currentPosts];

        return updatedPosts.sort((a: Post, b: Post) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

          return dateB - dateA;
        });
      });

      console.log(`${data.message}`);
    });

    newSocket.on('postUpdated', (data) => {
      console.log('Post updated:', data);

      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post._id === data.post._id ? { ...data.post } : post,
        ),
      );

      console.log(`${data.message}`);
    });

    newSocket.on('postDeleted', (data) => {
      console.log('Post deleted:', data);

      setPosts((currentPosts) =>
        currentPosts.filter((post) => post._id !== data.postId),
      );

      console.log(`${data.message}`);
    });

    newSocket.on('postLikeUpdated', (data) => {
      console.log('Post like updated:', data);

      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post._id === data.post._id ? { ...data.post } : post,
        ),
      );

      console.log(`${data.message}`);
    });

    return () => {
      console.log('Cleaning up socket connection');
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleProfileUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      const details = customEvent.detail;

      console.log('Profile updated event received in Home page', details);

      setLastUpdate(Date.now());

      if (details?.usernameChanged) {
        setTimeout(() => {
          fetchPosts();
        }, 500);
      } else {
        fetchPosts();
      }
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);

    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, [fetchPosts]);

  useEffect(() => {
    fetchPosts();
  }, [lastUpdate, fetchPosts]);

  return (
    <div className="w-full py-6">
      <div className="mx-auto w-full max-w-3xl -translate-x-28 transform space-y-4">
        {loading ? (
          <div className="flex h-screen items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">{error}</div>
        ) : posts.length === 0 ? (
          <div className="p-4 text-center">No posts yet</div>
        ) : (
          posts.map((post) => (
            <BlurFade key={`${post._id}-${lastUpdate}`} inView>
              <PostCard
                bio={post.bio}
                content={post.content}
                currentUser={
                  user.username ? { username: user.username } : undefined
                }
                date={post.date}
                likedBy={post.likedBy}
                numOfLikes={post.numOfLikes}
                postId={post._id}
                profilePicture={post.profilePicture}
                username={post.username}
              />
            </BlurFade>
          ))
        )}
      </div>
    </div>
  );
}
