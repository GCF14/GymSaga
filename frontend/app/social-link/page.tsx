import type { Metadata } from 'next'
import NavigationBar from "@/components/navigation-bar";

export const metadata: Metadata = {
  title: "GymSaga Social Link",
  description: "GymSaga Social Link Page",
}

export default function Profile() {
    return (
        <div className="w-full h-full items-center flex flex-col bg-background p-8 scrollbar-hide">
          <NavigationBar />
        </div>
    );
  }