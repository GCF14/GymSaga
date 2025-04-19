import React from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { BoxReveal } from "@/components/magicui/box-reveal"
import EditButton from "@/components/edit-button"
import { BlurFade } from "@/components/magicui/blur-fade"
import BadgeRow from "@/components/badge-row"
import { useAuthContext } from "@/hooks/useAuthContext"
import { useEffect, useState } from "react"

interface ProfileCardProps {
    className?: string;
    isOwner: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ className, isOwner }) => {
    const { user } = useAuthContext();
    const username = user?.username || "Guest";
    const [bio, setBio] = useState("Loading...");

    useEffect(() => {
        const fetchUserBio = async () => {
            if (!user) return;

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.userId}`)
                const data = await res.json();

                if (res.ok) {
                    setBio(data.bio || "No bio available.");
                } else {
                    setBio("Failed to load bio.");
                }
            } catch (error) {
                console.error("Error fetching user bio:", error);
                setBio("Error loading bio.");
            }

        };
        fetchUserBio();

    }, [user]);
    

    return (
        <BlurFade direction="up" className="flex flex-col overflow-hidden">
            <Card className={`h-[calc(100vh-8rem)] ${className}`}>
                <CardHeader>
                    <div className="flex justify-center items-center w-full">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <BoxReveal boxColor="hsl(var(--primary))" duration={0.50}>
                                        <Avatar className="w-24 h-24">
                                            <AvatarImage src="/Logo.png" alt="Avatar" />
                                            <AvatarFallback>
                                                <span className="material-symbols-rounded large">
                                                    account_circle
                                                </span>
                                            </AvatarFallback>
                                        </Avatar>
                                    </BoxReveal>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Nice picture!</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                        <CardTitle className="">
                            <BoxReveal boxColor="hsl(var(--primary))" duration={0.50}>
                                <p className="py-2">
                                    {username}
                                </p>
                            </BoxReveal>
                        </CardTitle>
                    <CardDescription className="flex flex-col">
                        <BoxReveal boxColor="hsl(var(--primary))" duration={0.50}>
                            <div>
                                <BadgeRow />
                                <div className="mt-2 flex flex-row gap-2">
                                    <p>
                                        0 Followers
                                    </p>
                                    <p>
                                        0 Following
                                    </p>
                                </div>
                            </div>
                        </BoxReveal>
                    </CardDescription>
                </CardHeader>
                <CardContent className="grow overflow-hidden">
                    <BlurFade>
                        <p>
                            {bio}
                        </p>
                    </BlurFade>
                </CardContent>
                <CardFooter>
                    <div className="flex justify-end items-center w-full">
                        {isOwner && <EditButton type="profile" />}
                    </div>
                </CardFooter>
            </Card>
        </BlurFade>
    );
};

export default ProfileCard;