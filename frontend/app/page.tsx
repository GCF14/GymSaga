'use client'

import NavigationBar from "@/components/navigation-bar"
import PostCard from "@/components/post-card"
import { BlurFade } from "@/components/magicui/blur-fade"
import { useEffect, useState } from "react"
import axios from "axios"
import { Post } from "@/types/post"

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`)
        const sortedPosts = data.sort((a: Post, b: Post) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0  
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0  
          return dateB - dateA
        })
        setPosts(sortedPosts)
        setError(null)
      } catch (error) {
        console.error("Error fetching posts:", error instanceof Error ? error.message : "Unknown error")
        setError("Could not load posts. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <>
      <div className="w-full h-full items-center flex flex-col bg-background p-8 scrollbar-hide">
        <NavigationBar />
        <div className="flex-col w-full md:w-1/2 mt-16 space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-10 h-10 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">{error}</div>
          ) : posts.length === 0 ? (
            <div className="text-center p-4">No posts yet</div>
          ) : (
            posts.map((post) => (
              <BlurFade key={post._id} inView>
                <PostCard 
                  username={post.username} 
                  content={post.content} 
                  profilePicture={post.profilePicture}
                  bio={post.bio}
                  date = {post.date }
                />
              </BlurFade>
            ))
          )}
        </div>
      </div>
    </>
  )
}