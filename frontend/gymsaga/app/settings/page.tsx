import { Metadata } from "next";
import NavigationBar from "@/components/navigation-bar";
import SettingsSidebar from "@/components/settings-sidebar";

export const metadata: Metadata = {
    title: "GymSaga Home",
    description: "GymSaga Home Page",
  }
  
  export default function Home() {
    return (
      <>
        <div className="w-full h-full items-center flex flex-col bg-background p-8 scrollbar-hide">
          <NavigationBar />
          <div className="mt-16 w-full h-[calc(100vh-8rem)] grid grid-cols-4 gap-4">
            <SettingsSidebar />
          </div>
        </div>
      </>
    );
  }