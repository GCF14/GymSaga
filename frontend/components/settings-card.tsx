import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Icons from "@/public/shadcn"
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { AnimatedIconBeam } from "./animatedicon-beam";

interface SettingsCardProps {
    className?: string;
}

export default function SettingsCard({ className }: SettingsCardProps) {
    return (
        <Card className={`overflow-auto ${className}`}>
            <CardHeader>
                <CardTitle className="text-3xl">
                    Settings
                </CardTitle>
            </CardHeader>
            <CardContent className="">
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
    )
}