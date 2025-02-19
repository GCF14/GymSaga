"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter
  } from "@/components/ui/table"
import { useEffect } from "react";
import { usePostsContext } from "@/hooks/usePostsContext";
import { Post } from "@/types/post";

export default function PostTable() {
    const port = process.env.NEXT_PUBLIC_PORT
    const { posts, dispatch } = usePostsContext();

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`http://localhost:${port}/api/posts`);
          const json = await response.json();
    
          if (response.ok) {
            dispatch({ type: "SET_POSTS", payload: json });
          }
        };
    
        fetchPosts();
      }, [dispatch]);

      const postList = posts ?? [];

    return (
        <Table>
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead>Post Content</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Number of Likes</TableHead>
                <TableHead>Liked by</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {postList.map((post: Post) => (
                    <TableRow key={post._id}>
                        <TableCell>{post.content}</TableCell>
                        <TableCell>{post.username}</TableCell>
                        <TableCell>{post.numOfLikes}</TableCell>
                        <TableCell>{post.likedBy}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}