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

interface ProfileTabProps {
    className?: string;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ className }) => {
    return (
        <Tabs defaultValue="posts" className={`flex flex-col h-[calc(100vh-8rem)] ${className}`}>
            <div className="flex justify-center">
                <TabsList className="grid w-1/2 grid-cols-3">
                    <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="workout">Workout</TabsTrigger>
                </TabsList>
            </div>
            <div className="flex-grow overflow-hidden p-2">
                <TabsContent value="meal-plan" className="h-full">
                    <Card className="h-full flex flex-col">
                        <CardHeader>
                            <CardTitle>Meal Plan</CardTitle>
                            <CardDescription>Short Description</CardDescription>
                        </CardHeader>
                            <CardContent className="h-full overflow-auto">
                                <h1 className="text-9xl font-bold text-center text-primary">
                                    Meal Plan Meal Plan Meal Plan Meal Plan Meal Plan Meal Plan Meal Plan Meal Plan 
                                </h1>
                            </CardContent>
                        <CardFooter>
                            <p>Footer</p>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="posts" className="h-full">Posts</TabsContent>
                <TabsContent value="workout" className="h-full">Workout</TabsContent>
            </div>
        </Tabs>
    )
}

export default ProfileTab