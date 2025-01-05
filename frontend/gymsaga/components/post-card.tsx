import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import React from "react";
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface PostCardProps {
    username: string;
    date: string;
    content: React.ReactNode;
}

export default function PostCard({ username, date, content }: PostCardProps) {
    const [isLiked, setIsLiked] = React.useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center h-full w-full">
            <       Avatar className="w-10 h-10 mr-4">
                        <AvatarImage src="/Logo.png" alt="Avatar" />
                        <AvatarFallback>
                            <span className="material-symbols-rounded large">
                                account_circle
                            </span>
                        </AvatarFallback>
                    </Avatar>
                <CardTitle>{username}</CardTitle>
                </div>
                <CardDescription>{date}</CardDescription>
            </CardHeader>
            <CardContent>
                {content}
            </CardContent>
            <CardFooter>
                <div className="flex items-center">
                    <Toggle onClick={handleLike}>
                    <span className={`material-symbols-rounded ${isLiked ? 'favorite-filled' : ''}`}>
                            favorite
                        </span>
                    </Toggle>
                    <Button variant="ghost" className="hover-button px-2">
                        <span className="material-symbols-rounded">
                            mode_comment
                        </span>
                    </Button>
                    <Button
                    variant="ghost"
                    className="hover-button px-2"
                    onClick={() => 
                        toast("Link Copied! 🎉", {
                            description: "Share it with your friends and let them join the fun!",
                            action: {
                                label: "Close",
                                onClick: () => toast.dismiss(),
                            },
                        })
                    }>
                        <span className="material-symbols-rounded">
                            share
                        </span>
                    </Button>
                </div>
            </CardFooter>
            <style>{`
                .favorite-filled {
                    color: red; /* Change this to your desired fill color */
                }
                .hover-button:hover {
                color: #a3a3a3;
                background-color: #262626;
                }
            `}</style>
        </Card>
    )
}