import React, { useState, useEffect } from 'react';

import EditButton from '@/components/edit-button';
import MealCarousel from '@/components/meal-carousel';
import PostCard from '@/components/post-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Post } from '@/types/post';

import { BlurFade } from './magicui/blur-fade';
import WorkoutCarousel from './workout-carousel';

interface ProfileTabProps {
  className?: string;
  isOwner: boolean;
  username: string;
}

export default function ProfileTab({
  className,
  isOwner,
  username,
}: ProfileTabProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(Date.now());

  useEffect(() => {
    // Listen for profile updates to refresh data
    const handleProfileUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log(
        'Profile updated event received in ProfileTab',
        customEvent.detail,
      );
      setRefreshKey(Date.now());
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);

    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Add cache-busting parameter
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/posts/user/${username}?t=${Date.now()}`,
          { cache: 'no-store' },
        );

        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error(
          'Error fetching posts:',
          error instanceof Error ? error.message : 'Unknown error',
        );
        setError('Could not load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [username, refreshKey]);

  return (
    <Tabs
      className={`flex h-[calc(100vh-8rem)] flex-col ${className}`}
      defaultValue="posts"
    >
      <BlurFade className="flex flex-col overflow-hidden" direction="left">
        <div className="flex justify-center">
          <TabsList className="grid w-1/2 grid-cols-3">
            <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
            <TabsTrigger value="posts">My Posts</TabsTrigger>
            <TabsTrigger value="workout">Workout Routine</TabsTrigger>
          </TabsList>
        </div>
        <div className="grow overflow-hidden p-2">
          <TabsContent
            className="animate-fade-right relative h-full"
            value="meal-plan"
          >
            <Card className="flex h-full flex-col">
              <CardHeader className="flex flex-row justify-between">
                <div>
                  <CardTitle>Meal Plan</CardTitle>
                  <CardDescription>Short Description</CardDescription>
                </div>
                {isOwner && <EditButton type="meal" />}
              </CardHeader>
              <CardContent className="flex h-full w-full flex-1 overflow-hidden">
                <MealCarousel />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent
            className="animate-fade-right relative h-full"
            value="posts"
          >
            <Card className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>My Posts</CardTitle>
                <CardDescription>
                  Look back on your previous posts!
                </CardDescription>
              </CardHeader>
              <CardContent className="flex h-full flex-col gap-4 overflow-y-auto">
                {loading && (
                  <div className="flex h-64 items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                  </div>
                )}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && posts.length === 0 && <p>No posts yet.</p>}
                {!loading &&
                  posts.map((post) => (
                    <PostCard
                      key={`${post._id}-${refreshKey}`}
                      bio={post.bio}
                      content={post.content}
                      date={post.date}
                      postId={post._id}
                      profilePicture={post.profilePicture}
                      username={username}
                    />
                  ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent
            className="animate-fade-right relative h-full"
            value="workout"
          >
            <Card className="flex h-full flex-col">
              <CardHeader className="flex flex-row justify-between">
                <div>
                  <CardTitle>Workout Routine</CardTitle>
                  <CardDescription>Short Description</CardDescription>
                </div>
                {isOwner && <EditButton type="workout" />}
              </CardHeader>
              <CardContent className="flex h-full w-full flex-1 overflow-hidden">
                <WorkoutCarousel />
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </BlurFade>
    </Tabs>
  );
}
