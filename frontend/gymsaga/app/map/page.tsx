"use client"

import Map from '../../components/Map/map';
import './style.css';
import NavigationBar from "@/components/navigation-bar";

export default function MapPage() {
  return (
    <>
      <head>
        <title>GymSaga - Map</title>
        <meta name="description" content="GymSaga Map" />
      </head>
      <div className="w-full h-full items-center flex flex-col bg-background p-8 scrollbar-hide">
        <NavigationBar />
        <div className="mt-16 w-full h-[calc(100vh-8rem)] bg-white overflow-hidden rounded-md shadow-md">
          <Map />
        </div>
      </div>
    </>
  );
}
