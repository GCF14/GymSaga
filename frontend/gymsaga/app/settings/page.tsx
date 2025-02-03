import { Metadata } from "next";
import NavigationBar from "@/components/navigation-bar";

export const metadata: Metadata = {
    title: "GymSaga Home",
    description: "GymSaga Home Page",
  }
  
  export default function Home() {
    return (
      <>
        <div className="w-full h-full items-center flex flex-col bg-background p-8 scrollbar-hide">
          <NavigationBar />
        </div>
      </>
    );
  }