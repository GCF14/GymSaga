import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

interface SettingsCardProps {
    className?: string;
}

export default function SettingsCard({ className }: SettingsCardProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>
                    Settings
                </CardTitle>
            </CardHeader>
        </Card>
    )
}