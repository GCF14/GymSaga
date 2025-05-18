'use client'

import NavigationBar from "@/components/navigation-bar"
import PostCard from "@/components/post-card"
import { BlurFade } from "@/components/magicui/blur-fade"
import { useEffect, useState, useCallback } from "react"
import axios from "axios"
import { Post } from "@/types/post"
import { useRouter } from "next/navigation"

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now())
  const router = useRouter()

  // Function to fetch posts - extracted so we can call it when needed
  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      // Add a cache-busting parameter to prevent browser caching
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts?t=${Date.now()}`,
        { headers: { 'Cache-Control': 'no-cache' } }
      )
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
  }, [])

  // Add this custom event listener for profile updates
  useEffect(() => {
    // Create a listener for profile updates
    const handleProfileUpdate = (event: Event) => {
      // Get details if available
      const customEvent = event as CustomEvent
      const details = customEvent.detail
      
      console.log('Profile updated event received in Home page', details)
      
      // Force a refresh of posts when profile is updated
      setLastUpdate(Date.now())
      
      // If it was a username change, we need to give the backend time to update
      if (details?.usernameChanged) {
        setTimeout(() => {
          fetchPosts()
        }, 500) // Half-second delay to let backend update posts
      } else {
        // Otherwise refresh immediately
        fetchPosts()
      }
    }

    // Listen for custom profile update events
    window.addEventListener('profileUpdated', handleProfileUpdate)

    // Clean up
    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate)
    }
  }, [fetchPosts])

  // Fetch posts initially and when lastUpdate changes
  useEffect(() => {
    fetchPosts()
  }, [lastUpdate, fetchPosts])

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
              <BlurFade key={`${post._id}-${lastUpdate}`} inView>
                <PostCard 
                  username={post.username} 
                  content={post.content} 
                  profilePicture={post.profilePicture}
                  bio={post.bio}
                  date={post.date}
                  postId={post._id}
                />
              </BlurFade>
            ))
          )}
        </div>
      </div>
    </>
  )
}