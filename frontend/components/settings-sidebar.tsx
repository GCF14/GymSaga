"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BlurFade } from "@/components/magicui/blur-fade"
import { BoxReveal } from "@/components/magicui/box-reveal"
import { User, Info } from "lucide-react"

interface SettingsSidebarProps {
    className?: string;
}

export default function SettingsSidebar({ className }: SettingsSidebarProps) {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };

    return (
        <BlurFade direction="up">
            <Card className={`h-[calc(100vh-8rem)] ${className}`}>
                <CardHeader>
                    <BoxReveal boxColor="hsl(var(--primary))" duration={0.50}>
                        <CardTitle className="text-3xl">
                            Settings
                        </CardTitle>
                    </BoxReveal>
                    <BoxReveal boxColor="hsl(var(--primary))" duration={0.50}>
                        <CardDescription>
                            Manage your preferences here!
                        </CardDescription>
                    </BoxReveal>
                    <CardContent className="p-0 pt-4 w-full">
                        <div className="flex flex-col gap-2">
                            <Button variant="ghost" onClick={() => scrollToSection('account')} className="justify-start w-full">
                                <User />
                                Account
                            </Button>
                            <Button variant="ghost" onClick={() => scrollToSection('credits')} className="justify-start w-full">
                                <Info />
                                About
                            </Button>
                        </div>
                    </CardContent>
                </CardHeader>
            </Card>
        </BlurFade>
    )
}