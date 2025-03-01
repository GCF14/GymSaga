import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import React from "react";
import { Heart, MessageSquare, ExternalLink } from "lucide-react"

interface LikeCommentShareBarProps {
    onClick: () => void;
    className?: string;
}

export default function LikeCommentShareBar({ onClick, className }: LikeCommentShareBarProps) {
    const [isLiked, setIsLiked] = React.useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
    }

    return (
        <div className={`flex items-center mb-4 ${className}`}>
            <Toggle onClick={handleLike}>
                <Heart color={isLiked ? "red" : "currentColor"} />
            </Toggle>
            <Button variant="ghost" size="icon" className="hover-button" onClick={onClick}>
                <MessageSquare />
            </Button>
            <Button
            variant="ghost"
            size="icon"
            className="hover-button"
            onClick={() => {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    toast("Link Copied! 🎉", {
                        description: "Share it with your friends and let them join the fun!",
                        action: {
                            label: "Close",
                            onClick: () => toast.dismiss(),
                        },
                    });
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            }}>
                <ExternalLink />
            </Button>
        </div>
    )
}