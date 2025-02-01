"use client"

import ProfileCard from "@/components/profile-card";
import NavigationBar from "@/components/navigation-bar";
import ProfileTab from "@/components/profile-tab";
import Head from "next/head";

export default function Profile() {
  return (
    <>
      <Head>
        <title>GymSaga - Profile</title>
        <meta name="description" content="GymSaga Profile" />
      </Head>
      <div className="w-full h-full items-center flex flex-col bg-background p-8 scrollbar-hide">
        <NavigationBar />
        <div className="mt-16 w-full h-[calc(100vh-8rem)] grid grid-cols-4 gap-4" >
          <ProfileCard className="col-span-1 flex flex-col h-full"/>
          <ProfileTab className="col-span-3"/>
        </div>
      </div>
    </>
  );
}