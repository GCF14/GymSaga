import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
  

interface ProfileCardProps {
    className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ className }) => {
    return (
        <Card className={className}>
            <CardHeader>
                <div className="flex justify-center items-center h-full w-full">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Avatar className="w-24 h-24">
                                    <AvatarImage src="/Logo.png" alt="Avatar" />
                                    <AvatarFallback>
                                        <span className="material-symbols-rounded large">
                                            account_circle
                                        </span>
                                    </AvatarFallback>
                                </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Nice picture!</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <CardTitle>Username</CardTitle>
                <CardDescription>Bio</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    );
};

export default ProfileCard;