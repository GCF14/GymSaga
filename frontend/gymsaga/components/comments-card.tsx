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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator"
import MoreMenu from "@/components/dropdown-menu"

interface CommentCardProps {
    onClose: () => void;
}

export default function CommentCard({ onClose }: CommentCardProps) {
    const [isLiked, setIsLiked] = React.useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <Card className="relative z-60 w-1/2 h-1/2">
                <CardHeader>
                    <h3 className="border-b pb-2 scroll-m-20 text-2xl font-semibold tracking-tight">
                        Comments
                    </h3>
                </CardHeader>
                <CardContent className="h-3/4">
                    <ScrollArea className="h-full w-full">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between mr-4">
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
                                <div className="flex items-center ml-10 mb-4">
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
                            <Separator className="mb-4" />
                        </div>
                        <div className="flex flex-col gap-2">
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
                                <p className="ml-12 mb-2">
                                    That's crazy, it actually works!
                                </p>
                                <div className="flex items-center ml-10 mb-4">
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
                            <Separator />
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}