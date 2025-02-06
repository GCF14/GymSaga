import ProfileCard from "@/components/profile-card";
import NavigationBar from "@/components/navigation-bar";
import ProfileTab from "@/components/profile-tab";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "GymSaga Profile",
  description: "GymSaga Profile Page",
}

export default function Profile() {
  return (
    <>
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