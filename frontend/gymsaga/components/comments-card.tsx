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

interface CommentCardProps {
    onClose: () => void;
}

export default function CommentCard({ onClose }: CommentCardProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <Card className="relative z-60 w-1/2 h-1/2">
                <CardHeader>
                    <h3 className="border-b pb-2 scroll-m-20 text-2xl font-semibold tracking-tight">
                        Comments
                    </h3>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center h-full w-full">
                        <Avatar className="w-10 h-10 mr-4">
                            <AvatarImage src="/Logo.png" alt="Avatar" />
                            <AvatarFallback>
                                <span className="material-symbols-rounded large">
                                    account_circle
                                </span>
                            </AvatarFallback>
                        </Avatar>
                        <CardTitle>Username</CardTitle>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}