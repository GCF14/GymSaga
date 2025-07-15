import { Metadata } from 'next';

import NavigationBar from '@/components/navigation-bar';
import SettingsCard from '@/components/settings-card';
import SettingsSidebar from '@/components/settings-sidebar';

export const metadata: Metadata = {
  title: 'GymSaga Home',
  description: 'GymSaga Home Page',
};

export default function Home() {
  return (
    <>
      <div className="bg-background scrollbar-hide flex h-full w-full flex-col items-center p-8">
        <NavigationBar />
        <div className="mt-16 grid h-[calc(100vh-8rem)] w-full grid-cols-4 gap-4">
          <SettingsSidebar className="col-span-1" />
          <SettingsCard className="col-span-3" />
        </div>
      </div>
    </>
  );
}
