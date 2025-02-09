import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SettingsSidebarProps {
    className?: string;
}

export default function SettingsSidebar({ className }: SettingsSidebarProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="text-3xl">
                    Settings
                </CardTitle>
                <CardDescription>
                    Manage your preferences here!
                </CardDescription>
                <CardContent className="p-0 pt-4 w-full">
                    <Button variant="outline" className="justify-start w-full">
                        Credits
                    </Button>
                </CardContent>
            </CardHeader>
        </Card>
    )
}