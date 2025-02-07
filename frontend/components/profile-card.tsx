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
import { BoxReveal } from "@/components/magicui/box-reveal";
import EditSaveButton from "@/components/editsave-button";
import { BlurFade } from "@/components/magicui/blur-fade";
  

interface ProfileCardProps {
    className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ className }) => {
    return (
        <BlurFade direction="up" className="flex flex-col overflow-hidden">
            <Card className={`h-[calc(100vh-8rem)] className`}>
                <CardHeader>
                    <div className="flex justify-center items-center w-full">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <BoxReveal boxColor="hsl(var(--primary))" duration={0.40}>
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
                    <BoxReveal boxColor="hsl(var(--primary))" duration={0.40}>
                        <CardTitle className="pt-2">@MatthewRiley05</CardTitle>
                    </BoxReveal>
                    <BoxReveal boxColor="hsl(var(--primary))" duration={0.40}>
                        <CardDescription className="pt-2">[JCA '23 🇵🇭|PolyU '27 🇭🇰]</CardDescription>
                    </BoxReveal>
                </CardHeader>
                <CardContent className="flex-grow overflow-hidden">
                    <BlurFade>
                        <h2 className="text-3xl font-extrabold tracking-tight overflow-hidden">
                            Card Content Card Content Card Content Card Content Card Content Card Content Card Content
                        </h2>
                    </BlurFade>
                </CardContent>
                <CardFooter>
                    <div className="flex justify-end items-center w-full">
                        <EditSaveButton />
                    </div>
                </CardFooter>
            </Card>
        </BlurFade>
    );
};

export default ProfileCard;