'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';

import { useParams, useRouter } from 'next/navigation';

import ProfileCard from '@/components/profile-card';
import ProfileTab from '@/components/profile-tab';

export default function ProfilePage() {
  const [isOwner, setIsOwner] = useState(false);
  const { username } = useParams();
  const router = useRouter();

  const decodedUsername = useMemo(() => {
    if (typeof username === 'string') {
      return decodeURIComponent(username);
    }

    return '';
  }, [username]);

  const checkOwnership = useCallback(() => {
    const storedUsername = localStorage.getItem('username') || '';
    const isOwnerProfile =
      decodedUsername.toLowerCase() === storedUsername.toLowerCase();
    setIsOwner(isOwnerProfile);
  }, [decodedUsername]);

  useEffect(() => {
    checkOwnership();
  }, [checkOwnership]);

  useEffect(() => {
    const handleProfileUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      const details = customEvent.detail || {};
      const { oldUsername, newUsername } = details;

      console.log('Profile updated event received in profile page', details);

      if (
        oldUsername &&
        newUsername &&
        decodedUsername.toLowerCase() === oldUsername.toLowerCase()
      ) {
        router.push(`/${encodeURIComponent(newUsername)}`);
      }

      checkOwnership();
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);

    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, [decodedUsername, router, checkOwnership]);

  return (
    <div className="w-full py-6 pl-4 md:pl-8">
      <div className="grid max-w-full grid-cols-1 gap-4 overflow-hidden md:grid-cols-4">
        <ProfileCard
          key={`profile-card-${decodedUsername}-${Date.now()}`}
          className="flex flex-col md:col-span-1"
          isOwner={isOwner}
          username={decodedUsername}
        />
        <ProfileTab
          key={`profile-tab-${decodedUsername}-${Date.now()}`}
          className="md:col-span-3"
          isOwner={isOwner}
          username={decodedUsername}
        />
      </div>
    </div>
  );
}
