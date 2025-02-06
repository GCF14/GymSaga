import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import React from "react";

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
                <span className={`material-symbols-rounded ${isLiked ? 'material-symbols-rounded filled' : ''}`}>
                    favorite
                </span>
            </Toggle>
            <Button variant="ghost" className="hover-button px-2" onClick={onClick}>
                <span className="material-symbols-rounded">
                    mode_comment
                </span>
            </Button>
            <Button
            variant="ghost"
            className="hover-button px-2"
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
                <span className="material-symbols-rounded">
                    share
                </span>
            </Button>
        </div>
    )
}