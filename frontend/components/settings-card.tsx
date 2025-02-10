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
import { Button } from "./ui/button";
import DeleteAccountButton from "./deleteaccount-button";

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
                    <div className="w-full mb-8">
                        <CardTitle className="text-2xl mb-2">
                            Account
                        </CardTitle>
                        <Separator />
                        <h3 className="my-2 text-red-800 scroll-m-20 text-xl font-semibold tracking-tight">
                            Danger Zone
                        </h3>
                        <div className="flex justify-center">
                            <DeleteAccountButton />
                        </div>
                    </div>
                    <div className="mb-8">
                        <CardTitle className="text-2xl mb-2">
                            Credits
                        </CardTitle>
                        <Separator />
                        <p className="mt-4">
                            Made with ❤️ by the GymSaga Team 
                        </p>
                        <AnimatedIconBeam />
                    </div>
                </CardContent>
            </Card>
        </BlurFade>
    )
}