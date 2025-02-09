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

interface SettingsSidebarProps {
    className?: string;
}

export default function SettingsSidebar({ className }: SettingsSidebarProps) {
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
                        <Button variant="outline" className="justify-start w-full">
                            Credits
                        </Button>
                    </CardContent>
                </CardHeader>
            </Card>
        </BlurFade>
    )
}