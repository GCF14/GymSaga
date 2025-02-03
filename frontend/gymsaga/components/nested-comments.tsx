import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { toast } from "sonner"
import MoreMenu from "@/components/dropdown-menu"
import React from "react";
import Link from "next/link";

export default function NestedComments() {
    const [isLiked, setIsLiked] = React.useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
    }

    const username = "GerardChristian05";

    return (
        <div className="ml-10 flex flex-col gap-2">
            <div className="flex justify-between mr-4">
                <div className="flex items-center">
                    <Avatar className="w-7 h-7 mr-2">
                        <AvatarImage src="/Logo.png" alt="Avatar" />
                        <AvatarFallback>
                            <span className="material-symbols-rounded large">
                                account_circle
                            </span>
                        </AvatarFallback>
                    </Avatar>
                    OngPagong04
                </div>
                <MoreMenu />
            </div>
            <p className="ml-9 mb-2">
                <Link href={username} className="hover:underline font-bold">@{username}</Link> This is a subcomment!
            </p>
            <div className="flex items-center ml-7 mb-4">
                <Toggle onClick={handleLike}>
                <span className={`material-symbols-rounded ${isLiked ? 'material-symbols-rounded filled' : ''}`}>
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
        </div>
    )
}