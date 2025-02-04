import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

interface SettingsSidebarProps {
    className?: string;
}

export default function SettingsSidebar({ className }: SettingsSidebarProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>
                    Settings
                </CardTitle>
                <CardDescription>
                    Manage your preferences here!
                </CardDescription>
            </CardHeader>
        </Card>
    )
}