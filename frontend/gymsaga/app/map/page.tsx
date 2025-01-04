"use client"

import Image from "next/image";
import Navbar from "@/components/navbar";
import { ModeToggle } from "@/components/modetoggle";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Map from '../../components/Map/map';
import './style.css';

export default function MapPage() {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <head>
        <title>GymSaga - Map</title>
        <meta name="description" content="GymSaga Map" />
      </head>
      <div className="w-full h-full items-center flex flex-col bg-background p-8 scrollbar-hide">
        <header className="fixed top-0 z-50 flex items-center justify-between w-full h-16 bg-transparent backdrop-blur-md shadow-md border-solid border-b">
          <div className="flex items-center ml-4 flex-1 justify-start">
            <Link href="/" className="inline-flex">
                <Image
                  src={resolvedTheme === "light" ? "/GymSagaDark.svg" : "/GymSagaLight.svg"}
                  width={50}
                  height={50}
                  alt="GymSaga Logo"
                />
              </Link>
              <Link href="/" className="inline-flex m-4">
                <h2 className="text-xl font-extrabold tracking-tight">GymSaga</h2>
              </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <Navbar />
          </div>
          <div className="flex items-center mr-4 flex-1 justify-end">
          <Link href="/settings">
            <Button variant="outline" size="icon" className="mr-4">
              <span className="material-symbols-rounded">
                settings
              </span>
            </Button>
          </Link>
            <ModeToggle />
          </div>
        </header>
        
        <div className="mt-16 w-full h-[calc(100vh-8rem)] bg-white overflow-hidden rounded-md border">
          <div id="map" className="w-full h-full rounded">
            <Map />
          </div>
        </div>
      </div>
    </>
  );
}
