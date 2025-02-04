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
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import MoreMenu from "@/components/dropdown-menu"
import NestedComments from "@/components/nested-comments"
import { Textarea } from "@/components/ui/textarea"
import LikeCommentShareBar from "@/components/likecommentshare-bar"
import React, { useRef } from "react"

interface CommentCardProps {
    onClose: () => void;
}

export default function CommentCard({ onClose }: CommentCardProps) {
    const [isLiked, setIsLiked] = React.useState(false);
    const [isNestedCommentVisible, setIsNestedCommentVisible] = React.useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleLike = () => {
        setIsLiked(!isLiked);
    }

    const handleNestedComments = () => {
        setIsNestedCommentVisible(!isNestedCommentVisible);
    }

    const handleAttachmentClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            console.log(file);
        }
    }

    React.useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        }
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <Card className="relative z-60 w-1/2 h-3/4 flex flex-col">
                <CardHeader>
                    <CardTitle>
                    Comments
                    </CardTitle>
                    <CardDescription>
                    Contribute your ideas and connect with others!
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                        <div className="flex flex-col">
                            <div className="flex justify-between">
                                <div className="flex items-center">
                                    <Avatar className="w-10 h-10 mr-2">
                                        <AvatarImage src="/Logo.png" alt="Avatar" />
                                        <AvatarFallback>
                                            <span className="material-symbols-rounded large">
                                                account_circle
                                            </span>
                                        </AvatarFallback>
                                    </Avatar>
                                    <CardTitle>GerardChristian05</CardTitle>
                                </div>
                                <MoreMenu />
                            </div>
                                <p className="ml-12 mb-2">
                                    That's crazy, it actually works!
                                </p>
                                <LikeCommentShareBar className="ml-10" onClick={() => { handleLike(); handleNestedComments(); }} />
                                {isNestedCommentVisible && <NestedComments />}
                                {isNestedCommentVisible && <NestedComments />}
                                {isNestedCommentVisible && <NestedComments />}
                            <Separator className="mb-4" />
                        </div>
                </CardContent>
                <CardFooter className="p-4 rounded-md">
                    <div className="flex w-full justify-center items-center">
                        <Button variant="outline" size="icon" className="hover-button" onClick={handleAttachmentClick}>
                            <span className="material-symbols-rounded">
                                attachment
                            </span>
                        </Button>
                        <Textarea placeholder="Write a comment..." rows={1} className="w-4/5 mx-4" />
                        <Button size="icon" className="hover-button">
                            <span className="material-symbols-rounded">
                                send
                            </span>
                        </Button>
                        <input
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />  
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}