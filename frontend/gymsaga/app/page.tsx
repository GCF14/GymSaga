"use client"

import NavigationBar from "@/components/navigation-bar";

export default function Home() {
  return (
    <>
      <head>
        <title>GymSaga - Home</title>
        <meta name="description" content="GymSaga Home" />
      </head>
      <div className="w-full h-full items-center flex flex-col bg-background p-8 scrollbar-hide">
        <NavigationBar />
        <div className="mt-16">
          <h1 className="text-9xl font-bold text-center text-primary">
            Home Page Home Page Home Page Home Page Home Page Home Page Home Page Home Page Home Page Home Page Home Page Home Page Home Page Home Page Home Page Home Page Home Page Home Page Home Page 
          </h1>
        </div>
      </div>
    </>
  );
}