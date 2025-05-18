
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import React from "react"
import PostCard from "@/components/post-card"
import MealCarousel from "@/components/meal-carousel";
import EditButton from "@/components/edit-button";
import { BlurFade } from "./magicui/blur-fade";
import WorkoutCarousel from "./workout-carousel";
import { useState, useEffect } from "react";
import { Post } from "@/types/post"

interface ProfileTabProps {
    className?: string;
    isOwner: boolean;
    username: string;
}

export default function ProfileTab({ className, isOwner, username }: ProfileTabProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState<number>(Date.now());

    useEffect(() => {
        // Listen for profile updates to refresh data
        const handleProfileUpdate = (event: Event) => {
            const customEvent = event as CustomEvent;
            console.log('Profile updated event received in ProfileTab', customEvent.detail);
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
                    { cache: 'no-store' }
                );
                
                if (!res.ok) throw new Error("Failed to fetch posts");

                const data = await res.json();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error instanceof Error ? error.message : "Unknown error")
                setError("Could not load posts. Please try again later.")
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [username, refreshKey]);

    return (
        <Tabs defaultValue="posts" className={`flex flex-col h-[calc(100vh-8rem)] ${className}`}>
            <BlurFade direction="left" className="flex flex-col overflow-hidden">
                <div className="flex justify-center">
                    <TabsList className="grid w-1/2 grid-cols-3">
                        <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
                        <TabsTrigger value="posts">My Posts</TabsTrigger>
                        <TabsTrigger value="workout">Workout Routine</TabsTrigger>
                    </TabsList>
                </div>
                <div className="grow overflow-hidden p-2">
                    <TabsContent value="meal-plan" className="relative h-full animate-fade-right">
                        <Card className="h-full flex flex-col">
                            <CardHeader className="flex flex-row justify-between">
                                <div>
                                    <CardTitle>Meal Plan</CardTitle>
                                    <CardDescription>Short Description</CardDescription>
                                </div>
                                {isOwner && <EditButton type="meal" />}
                            </CardHeader>
                                <CardContent className="h-full w-full flex flex-1 overflow-hidden">
                                    <MealCarousel />
                                </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="posts" className="relative h-full animate-fade-right">
                        <Card className="h-full flex flex-col">
                            <CardHeader>
                                <CardTitle>My Posts</CardTitle>
                                <CardDescription>Look back on your previous posts!</CardDescription>
                            </CardHeader>
                                <CardContent className="flex flex-col h-full overflow-y-auto gap-4">
                                    {loading && 
                                    <div className="flex justify-center items-center h-64">
                                        <div className="w-10 h-10 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                                    </div>
                                    }
                                    {error && <p className="text-red-500">{error}</p>}
                                    {!loading && posts.length === 0 && <p>No posts yet.</p>}
                                    {!loading && posts.map((post) => (
                                        <PostCard 
                                            key={`${post._id}-${refreshKey}`} 
                                            username={username} 
                                            bio={post.bio}
                                            profilePicture={post.profilePicture}
                                            content={post.content} 
                                            date={post.date}
                                            postId={post._id}
                                        />
                                    ))}
                                </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="workout" className="relative h-full animate-fade-right">
                        <Card className="h-full flex flex-col">
                            <CardHeader className="flex flex-row justify-between">
                                <div>
                                    <CardTitle>Workout Routine</CardTitle>
                                    <CardDescription>Short Description</CardDescription>
                                </div>
                                {isOwner && <EditButton type="workout" />}
                            </CardHeader>
                            <CardContent className="h-full w-full flex flex-1 overflow-hidden">
                                <WorkoutCarousel />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>
            </BlurFade>
        </Tabs>
    )
}