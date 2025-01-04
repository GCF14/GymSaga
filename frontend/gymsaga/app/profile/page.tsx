"use client"

import ProfileCard from "@/components/profile-card";
import NavigationBar from "@/components/navigation-bar";

export default function Profile() {
  return (
    <>
      <head>
        <title>GymSaga - Profile</title>
        <meta name="description" content="GymSaga Profile" />
      </head>
      <div className="w-full h-full items-center flex flex-col bg-background p-8 scrollbar-hide">
        <NavigationBar />
        <div className="mt-16 w-full h-[calc(100vh-8rem)] grid grid-cols-4 gap-4">
          <ProfileCard className="col-span-1"/>
        </div>
      </div>
    </>
  );
}