import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import MoreMenu from "@/components/dropdown-menu"
import React from "react"
import Link from "next/link"
import LikeCommentShareBar from "@/components/like-comment-share-bar"

export default function NestedComments() {
    const [isLiked, setIsLiked] = React.useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
    }

    const username = "GerardChristian05";

    return (
        <div className="ml-10 flex flex-col">
            <div className="flex justify-between">
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
            <LikeCommentShareBar className="ml-7" onClick={handleLike} />
        </div>
    )
}