"use client";

import { useEffect, useState } from "react";
import NavigationBar from "@/components/navigation-bar";
import ProfileCard from "@/components/profile-card";
import ProfileTab from "@/components/profile-tab";
import { useParams } from "next/navigation";

export default function ProfilePage() {
    const [isOwner, setIsOwner] = useState(false)
    const { username } = useParams()

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");

        if (typeof username === "string") {
            const decodedUsername = decodeURIComponent(username);
            const normalizedUsername = decodedUsername.startsWith("@") ? decodedUsername : `@${decodedUsername}`;
    
            if (normalizedUsername === storedUsername) {
                setIsOwner(true);
            }
        }

    
    }, [username])

    return (
        <div className="w-full h-full items-center flex flex-col bg-background p-8 scrollbar-hide">
            <NavigationBar />
            <div className="mt-16 w-full h-[calc(100vh-8rem)] grid grid-cols-4 gap-4">
                <ProfileCard isOwner={isOwner} className="col-span-1 flex flex-col" />
                <ProfileTab isOwner={isOwner} className="col-span-3" />
            </div>
        </div>
    );
}