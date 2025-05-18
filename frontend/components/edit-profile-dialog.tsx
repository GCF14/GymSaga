"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"
import { toast } from "sonner"
import { useAuthContext } from "@/hooks/useAuthContext"
import { useState } from "react"


export default function EditProfileDialog() {
    const { user } = useAuthContext();
    const userId = user?.userId;
    const [username, setUsername] = useState(user?.username || "")
    const [bio, setBio] = useState(user?.bio || "")
    const { dispatch } = useAuthContext(); 

    const handleUpdate = async () => {
        if (!userId) {
            toast.error("User ID not found.")
            return;
        }
    
        const bodyData: Partial<{
            username: string;
            bio: string;
        }> = {};
    
        if (username.trim() !== "") {
            bodyData.username = username;
        }
    
        if (bio.trim() !== "") {
            bodyData.bio = bio;
        }
    
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/update/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyData),
            });
    
            const data = await res.json();
    
            if (!res.ok) {
                toast.error(data.message || data.error || "Failed to update profile.");
            } else {
                localStorage.setItem('username', username);
                toast.success("Profile successfully updated!");
                dispatch({
                    type: "LOGIN",
                    payload: { ...user, ...bodyData }, 
                });
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("An error occurred while updating the profile.");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <span className="material-symbols-rounded">edit</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        Edit Profile
                    </DialogTitle>
                    <DialogDescription>
                        Update your profile information here!
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name">Username</Label>
                        <Input 
                            id="username"
                            value={username}
                            className="col-span-3" 
                            placeholder={username} 
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                            id="bio"
                            placeholder="Write something about yourself..." 
                            rows={10}
                            onChange={(e) => setBio(e.target.value)}
                        />

                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild className="flex justify-end">
                    <Button onClick={handleUpdate}>Save</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}