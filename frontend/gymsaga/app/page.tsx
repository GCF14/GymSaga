"use client"

import NavigationBar from "@/components/navigation-bar";
import PostCard from "@/components/post-card";

export default function Home() {
  return (
    <>
      <head>
        <title>GymSaga - Home</title>
        <meta name="description" content="GymSaga Home" />
      </head>
      <div className="w-full h-full items-center flex flex-col bg-background p-8 scrollbar-hide">
        <NavigationBar />
        <div className="flex-col w-1/2 mt-16 space-y-4">
          <PostCard username={"Matthew Raymundo"} content={"This is the post template of our app!"}/>
          <PostCard username={"Gerard Christian"} content={"Testing if works"}/>
        </div>
      </div>
    </>
  );
}