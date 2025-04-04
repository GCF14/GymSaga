import NavigationBar from "@/components/navigation-bar"
import PostCard from "@/components/post-card"
import type { Metadata } from 'next'
import { BlurFade } from "@/components/magicui/blur-fade"
// import { useEffect, useState } from "react";
import axios from "axios";

export const metadata: Metadata = {
  title: "GymSaga Home",
  description: "GymSaga Home Page",
}

export default function Home() {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const { data } = await axios.get("http://localhost:5500/api/posts");
  //       setPosts(data);
  //     } catch (error) {
  //       console.error("Error fetching posts:", error instanceof Error ? error.message : "Unknown error");
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  return (
    <>
      <div className="w-full h-full items-center flex flex-col bg-background p-8 scrollbar-hide">
        <NavigationBar />
        <div className="flex-col w-full md:w-1/2 mt-16 space-y-4">
          <BlurFade inView>
            <PostCard username={"MatthewRiley05"} content={"This is the post template of our app!"}/>
          </BlurFade>
          <BlurFade inView>
            <PostCard username={"GerardChristian05"} content={"Testing if it works"}/>
          </BlurFade>
          <BlurFade inView>
            <PostCard username={"Ethan Ong"} content={"This is crazy"}/>
          </BlurFade>
          <BlurFade inView>
            <PostCard username={"Adrian Lua"} content={"I had an amazing workout in PolyU today"}/>
          </BlurFade>
          <BlurFade inView>
          <PostCard username={"Jonah Chua"} content={"I love doing data analytics"}/>
        </BlurFade>
        </div>
      </div>
    </>
  );
}