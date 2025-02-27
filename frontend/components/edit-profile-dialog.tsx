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

export default function EditProfileDialog() {
    const username = "MatthewRiley05"

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
                <div className="grid gap-4">
                    <div className="flex flex-row ml-2 items-center gap-4">
                        <Label htmlFor="name">Username</Label>
                        <Input type="text" className="w-full" placeholder={username} />
                    </div>
                    <Textarea placeholder="Write something about yourself..." rows={10}></Textarea>
                </div>
                <DialogFooter>
                    <DialogClose asChild className="flex justify-end">
                    <Button 
                        onClick={() => {
                            toast.success("Profile successfully updated!", {
                                style: {
                                    color: "#ffffff",
                                    borderColor: "#16a34a",
                                    backgroundColor: "#16a34a",
                                }
                            })
                        }}>
                        Save
                    </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}