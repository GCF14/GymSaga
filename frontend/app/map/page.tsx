"use client";

import Map from "@/components/map/map.js";
import "./style.css";
import NavigationBar from "@/components/navigation-bar";

export default function MapPage() {
  return (
    <>
      <div className="w-full h-full items-center flex flex-col bg-background p-8 scrollbar-hide">
        <NavigationBar />
        <div className="mt-16 w-full h-[calc(100vh-8rem)] bg-white overflow-hidden rounded-md shadow-md">
          <Map />
        </div>
      </div>
    </>
  );
}
