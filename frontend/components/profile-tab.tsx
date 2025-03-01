import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import React from "react"
import PostCard from "@/components/post-card"
import MealCarousel from "@/components/meal-carousel";
import EditButton from "@/components/edit-button";
import { BlurFade } from "@/components/magicui/blur-fade";
import WorkoutCarousel from "@/components/workout-carousel";

interface ProfileTabProps {
    className?: string;
    isOwner: boolean;
}

export default function ProfileTab({ className, isOwner }: ProfileTabProps) {
    return (
        <Tabs defaultValue="posts" className={`flex flex-col h-[calc(100vh-8rem)] ${className}`}>
            <BlurFade direction="left" className="flex flex-col overflow-hidden">
                <div className="flex justify-center">
                    <TabsList className="grid w-1/2 grid-cols-3">
                        <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
                        <TabsTrigger value="posts">My Posts</TabsTrigger>
                        <TabsTrigger value="workout">Workout Routine</TabsTrigger>
                    </TabsList>
                </div>
                <div className="grow overflow-hidden p-2">
                    <TabsContent value="meal-plan" className="relative h-full animate-fade-right">
                        <Card className="h-full flex flex-col">
                            <CardHeader className="flex flex-row justify-between">
                                <div>
                                    <CardTitle>Meal Plan</CardTitle>
                                    <CardDescription>Short Description</CardDescription>
                                </div>
                                {isOwner && <EditButton type="meal" />}
                            </CardHeader>
                                <CardContent className="h-full w-full flex flex-1 overflow-hidden">
                                    <MealCarousel />
                                </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="posts" className="relative h-full animate-fade-right">
                        <Card className="h-full flex flex-col">
                            <CardHeader>
                                <CardTitle>My Posts</CardTitle>
                                <CardDescription>Look back on your previous posts!</CardDescription>
                            </CardHeader>
                                <CardContent className="flex flex-col h-full overflow-y-auto gap-4">
                                    <PostCard username={"Matthew Raymundo"} content={"This is the post template of our app!"} />
                                    <PostCard username={"Matthew Raymundo"} content={"Di ko alam ano lalagay sa page na toh"} />
                                </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="workout" className="relative h-full animate-fade-right">
                        <Card className="h-full flex flex-col">
                            <CardHeader className="flex flex-row justify-between">
                                <div>
                                    <CardTitle>Workout Routine</CardTitle>
                                    <CardDescription>Short Description</CardDescription>
                                </div>
                                {isOwner && <EditButton type="workout" />}
                            </CardHeader>
                            <CardContent className="h-full w-full flex flex-1 overflow-hidden">
                                <WorkoutCarousel />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>
            </BlurFade>
        </Tabs>
    )
}