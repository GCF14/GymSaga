"use client";

import { useEffect, useState, useCallback } from "react";
import ProfileCard from "@/components/profile-card";
import ProfileTab from "@/components/profile-tab";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

export default function ProfilePage() {
    const [isOwner, setIsOwner] = useState(false);
    const { username } = useParams();
    const router = useRouter();


    const decodedUsername = useMemo(() => {
        if (typeof username === "string") {
            return decodeURIComponent(username);
        }
        return "";
    }, [username]);

    const checkOwnership = useCallback(() => {
        const storedUsername = localStorage.getItem("username") || "";
        const isOwnerProfile = decodedUsername.toLowerCase() === storedUsername.toLowerCase();
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
            
            if (oldUsername && newUsername && decodedUsername.toLowerCase() === oldUsername.toLowerCase()) {
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-full overflow-hidden">
                <ProfileCard 
                    isOwner={isOwner} 
                    className="md:col-span-1 flex flex-col" 
                    key={`profile-card-${decodedUsername}-${Date.now()}`} 
                    username={decodedUsername}
                />
                <ProfileTab 
                    isOwner={isOwner} 
                    className="md:col-span-3" 
                    username={decodedUsername} 
                    key={`profile-tab-${decodedUsername}-${Date.now()}`}
                />
            </div>
        </div>
    );
}