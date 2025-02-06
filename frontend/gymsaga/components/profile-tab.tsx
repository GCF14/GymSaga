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
import { Particles } from "@/components/particles";

interface ProfileTabProps {
    className?: string;
}

export default function ProfileTab({ className }: ProfileTabProps) {
    return (
        <Tabs defaultValue="posts" className={`flex flex-col h-[calc(100vh-8rem)] ${className}`}>
            <div className="flex justify-center">
                <TabsList className="grid w-1/2 grid-cols-3">
                    <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
                    <TabsTrigger value="posts">My Posts</TabsTrigger>
                    <TabsTrigger value="workout">Workout Routine</TabsTrigger>
                </TabsList>
            </div>
            <div className="flex-grow overflow-hidden p-2">
                <TabsContent value="meal-plan" className="relative h-full animate-fade-right">
                    <Card className="z-10 h-full flex flex-col">
                        <Particles
                            className="absolute inset-0 z-0"
                            quantity={100}
                            ease={80}
                            refresh
                        />
                        <CardHeader>
                            <CardTitle>Meal Plan</CardTitle>
                            <CardDescription>Short Description</CardDescription>
                        </CardHeader>
                            <CardContent className="h-full w-full flex flex-1 overflow-hidden">
                                <MealCarousel />
                            </CardContent>
                        <CardFooter>
                            <p>Footer</p>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="posts" className="relative h-full animate-fade-right">
                    <Card className="z-10 h-full flex flex-col">
                        <Particles
                            className="absolute inset-0 z-0"
                            quantity={100}
                            ease={80}
                            refresh
                        />
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
                    <Card className="z-10 h-full flex flex-col">
                        <Particles
                            className="absolute inset-0 z-0"
                            quantity={100}
                            ease={80}
                            refresh
                        />
                        <CardHeader>
                            <CardTitle>Workout Routine</CardTitle>
                            <CardDescription>Short Description</CardDescription>
                        </CardHeader>
                            <CardContent className="h-full overflow-hidden">
                                <h1 className="text-9xl font-bold text-center text-primary">
                                    Workout Routine Workout Routine Workout Routine Workout Routine Workout Routine 
                                </h1>
                            </CardContent>
                        <CardFooter>
                            <p>Footer</p>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </div>
        </Tabs>
    )
}