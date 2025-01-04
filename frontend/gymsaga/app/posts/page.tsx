"use client"

import NavigationBar from "@/components/navigation-bar";

export default function Posts() {
  return (
    <>
      <head>
        <title>GymSaga - Posts Testing Page</title>
        <meta name="description" content="GymSaga Profile" />
      </head>
      <div className="w-full h-full items-center flex flex-col bg-background p-8 scrollbar-hide">
        <NavigationBar />
        <div className="mt-16">
        </div>
      </div>
    </>
  );
}