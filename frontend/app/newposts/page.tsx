"use client";

import { useEffect } from "react";
import NavigationBar from "@/components/navigation-bar";
import PostDetails from "@/components/backend/PostDetails";
import PostForm from "@/components/backend/PostForm";
import { usePostsContext } from "@/hooks/usePostsContext"; 
import { Post } from "@/types/post"; 
import "./style.css";
import { useAuthContext } from "@/hooks/useAuthContext";

const port = process.env.NEXT_PUBLIC_PORT;

export default function Posts() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`http://localhost:${port}/api/workouts`, {
        credentials: "include",
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_POSTS", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }

    
  }, [dispatch, user]);

  
  const postList = posts ?? [];


  return (
    <>
      <div className="w-full h-full items-center flex flex-col bg-background p-8 scrollbar-hide">
        <NavigationBar />
        <div className="mt-16 container">
          <div className="posts">
            {postList.map((post: Post) => (
              <PostDetails key={post._id} post={post} />
            ))}
          </div>
          <PostForm />
        </div>
      </div>
    </>
  );
}
