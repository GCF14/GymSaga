"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AnimatedIconBeam } from "./animated-icon-beam"
import { BlurFade } from "@/components/magicui/blur-fade"
import DeleteAccountButton from "@/components/delete-account-button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface SettingsCardProps {
    className?: string;
}

export default function SettingsCard({ className }: SettingsCardProps) {

    const [username, setUsername] = useState<string | null>(null);
    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        setUsername(storedUsername);
        const storedFirstName = localStorage.getItem("firstName");
        setFirstName(storedFirstName);
        const storedLastName = localStorage.getItem("lastName");
        setLastName(storedLastName);
        const storedEmail = localStorage.getItem("email");
        setEmail(storedEmail);
    }, []);

    return (
        <BlurFade className="col-span-3" direction="left">
            <Card className={`overflow-auto h-[calc(100vh-8rem)] ${className}`}>
                <CardHeader>
                    <CardTitle className="text-3xl">
                        Settings
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full mb-8">
                        <CardTitle id="account" className="text-2xl mb-2">
                            Account
                        </CardTitle>
                        <Separator />
                        <div className="flex flex-col">
                            <h3 className="ml-4 my-4 scroll-m-20 text-xl font-semibold tracking-tight">
                                Account Details
                            </h3>
                            <div className="flex flex-col gap-4 ml-8">
                                <div className="flex flex-row items-center gap-2">
                                    <span className="text-right w-24">
                                        Email
                                    </span>
                                    <Input disabled type="username" placeholder={email ?? ""} className="w-96" />
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <span className="text-right w-24">
                                        Username
                                    </span>
                                    <Input disabled type="username" placeholder={username ?? ""} className="w-96" />
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <span className="text-right w-24">
                                        First Name
                                    </span>
                                    <Input disabled type="first name" placeholder={firstName ?? ""} className="w-96" />
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <span className="text-right w-24">
                                        Last Name
                                    </span>
                                    <Input disabled type="last name" placeholder={lastName ?? ""} className="w-96" />
                                </div>
                            </div>
                            <Button className="ml-auto w-20 mt-4" onClick={() => alert("Not implemented")}>
                                Edit
                            </Button>
                        </div>
                        <h3 className="my-4 ml-4 text-red-800 scroll-m-20 text-xl font-semibold tracking-tight">
                            Danger Zone
                        </h3>
                        <div className="flex justify-center">
                            <DeleteAccountButton />
                        </div>
                    </div>
                    <div className="mb-8">
                        <CardTitle id="credits" className="text-2xl mb-2">
                            Credits
                        </CardTitle>
                        <Separator />
                        <p className="m-4">
                            Made with ❤️ by the GymSaga Team 
                        </p>
                        <AnimatedIconBeam />
                    </div>
                </CardContent>
            </Card>
        </BlurFade>
    )
}