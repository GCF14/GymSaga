import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AnimatedIconBeam } from "./animatedicon-beam"
import { BlurFade } from "@/components/magicui/blur-fade"

interface SettingsCardProps {
    className?: string;
}

export default function SettingsCard({ className }: SettingsCardProps) {
    return (
        <BlurFade className="col-span-3" direction="left">
            <Card className={`overflow-auto h-[calc(100vh-8rem)] ${className}`}>
                <CardHeader>
                    <CardTitle className="text-3xl">
                        Settings
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CardTitle className="text-2xl mb-2">
                        Credits
                    </CardTitle>
                    <Separator />
                    <p className="mt-4">
                        Made with ❤️ by the GymSaga Team 
                    </p>
                    <AnimatedIconBeam />
                </CardContent>
            </Card>
        </BlurFade>
    )
}