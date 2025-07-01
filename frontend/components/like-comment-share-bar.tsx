import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useState, useEffect } from "react"

interface LikeCommentShareBarProps {
    postId: string;
    initialLikeCount: number;
    initialLikedBy: string[];
    currentUsername: string;
    onCommentClick: () => void;
    className?: string;
}

export default function LikeCommentShareBar({ 
    postId, 
    initialLikeCount, 
    initialLikedBy, 
    currentUsername, 
    onCommentClick, 
    className 
}: LikeCommentShareBarProps) {
    const [likeCount, setLikeCount] = useState(initialLikeCount);
    const [likedBy, setLikedBy] = useState<string[]>(initialLikedBy || []);
    const [isLoading, setIsLoading] = useState(false);

    const isLiked = Array.isArray(likedBy) && likedBy.includes(currentUsername);

    const handleLike = async () => {
        if (isLoading) return;

        const wasLiked = isLiked;
        const newLikeCount = wasLiked ? likeCount - 1 : likeCount + 1;
        const newLikedBy = wasLiked 
            ? (likedBy || []).filter(user => user !== currentUsername)
            : [...(likedBy || []), currentUsername];

        setLikeCount(newLikeCount);
        setLikedBy(newLikedBy);
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}/like`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: currentUsername,
                    action: wasLiked ? 'unlike' : 'like'
                })
            });

            if (!response.ok) {
                setLikeCount(likeCount);
                setLikedBy(likedBy);
                toast.error("Failed to update like");
            }

        } catch (error) {
            setLikeCount(likeCount);
            setLikedBy(likedBy);
            console.error('Error updating like:', error);
            toast.error("Failed to update like");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setLikeCount(initialLikeCount);
        setLikedBy(initialLikedBy || []);
    }, [initialLikeCount, initialLikedBy]);

    return (
        <div className={`flex items-start gap-2 mb-4 ${className}`}>
            <div className="flex flex-col items-center min-h-[48px]">
                <Toggle onClick={handleLike} className="mb-1">
                    <span className={`material-symbols-rounded ${isLiked ? 'material-symbols-rounded filled' : ''}`}>
                        favorite
                    </span>
                </Toggle>
                <span className="text-xs text-gray-500 h-4 flex items-center">
                    {likeCount > 0 ? likeCount : ''}
                </span>
            </div>

            <div className="flex flex-col items-center min-h-[48px]">
                <Button variant="ghost" className="hover-button px-2 mb-1" onClick={onCommentClick}>
                    <span className="material-symbols-rounded">
                        mode_comment
                    </span>
                </Button>
                <div className="h-4"></div>
            </div>

            <div className="flex flex-col items-center min-h-[48px]">
                <Button
                    variant="ghost"
                    className="hover-button px-2 mb-1"
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
                    }}
                >
                    <span className="material-symbols-rounded">
                        share
                    </span>
                </Button>
                <div className="h-4"></div>
            </div>
        </div>
    )
}