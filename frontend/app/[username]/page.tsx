"use client";

import { useEffect, useState, useCallback } from "react";
import NavigationBar from "@/components/navigation-bar";
import ProfileCard from "@/components/profile-card";
import ProfileTab from "@/components/profile-tab";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

export default function ProfilePage() {
    const [isOwner, setIsOwner] = useState(false);
    const { username } = useParams();
    const router = useRouter();

    // Decode the username from URL
    const decodedUsername = useMemo(() => {
        if (typeof username === "string") {
            return decodeURIComponent(username);
        }
        return "";
    }, [username]);

    // Check if current user owns this profile
    const checkOwnership = useCallback(() => {
        const storedUsername = localStorage.getItem("username") || "";
        const isOwnerProfile = decodedUsername.toLowerCase() === storedUsername.toLowerCase();
        setIsOwner(isOwnerProfile);
    }, [decodedUsername]);

    // Initial check on component mount
    useEffect(() => {
        checkOwnership();
    }, [checkOwnership]);

    // Listen for profile updates
    useEffect(() => {
        const handleProfileUpdate = (event: Event) => {
            // Get details if available
            const customEvent = event as CustomEvent;
            const details = customEvent.detail || {};
            const { oldUsername, newUsername } = details;
            
            console.log('Profile updated event received in profile page', details);
            
            // Check if this is the profile page of the user who just updated their username
            if (oldUsername && newUsername && decodedUsername.toLowerCase() === oldUsername.toLowerCase()) {
                // Redirect to the new username URL
                router.push(`/${encodeURIComponent(newUsername)}`);
            }
            
            // Re-check ownership in case the username changed
            checkOwnership();
        };

        window.addEventListener('profileUpdated', handleProfileUpdate);
        
        return () => {
            window.removeEventListener('profileUpdated', handleProfileUpdate);
        };
    }, [decodedUsername, router, checkOwnership]);

    return (
        <div className="w-full h-full items-center flex flex-col bg-background p-8 scrollbar-hide">
            <NavigationBar />
            <div className="mt-16 w-full h-[calc(100vh-8rem)] grid grid-cols-4 gap-4">
                <ProfileCard 
                    isOwner={isOwner} 
                    className="col-span-1 flex flex-col" 
                    key={`profile-card-${decodedUsername}-${Date.now()}`} 
                    username={decodedUsername}
                />
                <ProfileTab 
                    isOwner={isOwner} 
                    className="col-span-3" 
                    username={decodedUsername} 
                    key={`profile-tab-${decodedUsername}-${Date.now()}`}
                />
            </div>
        </div>
    );
}