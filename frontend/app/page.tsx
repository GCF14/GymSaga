'use client'

import NavigationBar from "@/components/navigation-bar"
import PostCard from "@/components/post-card"
// import type { Metadata } from 'next'
import { BlurFade } from "@/components/magicui/blur-fade"
import { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "@/types/post";

// export const metadata: Metadata = {
//   title: "GymSaga Home",
//   description: "GymSaga Home Page",
// }

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error instanceof Error ? error.message : "Unknown error");
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="w-full h-full items-center flex flex-col bg-background p-8 scrollbar-hide">
        <NavigationBar />
        <div className="flex-col w-full md:w-1/2 mt-16 space-y-4">
        {posts.map((post) => (
          <BlurFade key={post._id} inView>
            <PostCard 
              username={post.username} 
              content={post.content} 
            />
          </BlurFade>
        ))}
        </div>
      </div>
    </>
  );
}