import { Badge } from "@/components/ui/badge"

export default function BadgeRow() {
    return (
        <div className="flex flex-row gap-2 items-center justify-center">
            <Badge>CEO</Badge>
            <Badge>Dev</Badge>
            <Badge>Designer</Badge>
        </div>
    )
}