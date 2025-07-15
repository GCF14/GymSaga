'use client';

import Map from '@/components/map/map.js';
import './style.css';
import NavigationBar from '@/components/navigation-bar';

export default function MapPage() {
  return (
    <>
      <div className="bg-background scrollbar-hide flex h-full w-full flex-col items-center p-8">
        <NavigationBar />
        <div className="mt-16 h-[calc(100vh-8rem)] w-full overflow-hidden rounded-md bg-white shadow-md">
          <Map />
        </div>
      </div>
    </>
  );
}
