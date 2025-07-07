'use client'

import PostCard from "@/components/post-card"
import { BlurFade } from "@/components/magicui/blur-fade"
import { useEffect, useState, useCallback } from "react"
import axios from "axios"
import { Post } from "@/types/post"
import { io } from "socket.io-client"
import { useAuthContext } from "@/hooks/useAuthContext";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState(Date.now())
  const { user } = useAuthContext();

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


  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(process.env.NEXT_PUBLIC_API_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling']
    })

    // Connection event handlers
    newSocket.on('connect', () => {
      console.log('Connected to server:', newSocket.id)
    })

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server')
    })

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error)
    })

    newSocket.on('newPost', (data) => {
      console.log('New post received:', data)
      
      setPosts(currentPosts => {
        const postExists = currentPosts.some(post => post._id === data.post._id)
        if (postExists) {
          return currentPosts
        }
        
        const updatedPosts = [data.post, ...currentPosts]
        return updatedPosts.sort((a: Post, b: Post) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
          return dateB - dateA
        })
      })
      
      console.log(`${data.message}`)
    })

    newSocket.on('postUpdated', (data) => {
      console.log('Post updated:', data)
      
      setPosts(currentPosts => 
        currentPosts.map(post => 
          post._id === data.post._id ? { ...data.post } : post
        )
      )
      
      console.log(`${data.message}`)
    })

    newSocket.on('postDeleted', (data) => {
      console.log('Post deleted:', data)
      
      setPosts(currentPosts => 
        currentPosts.filter(post => post._id !== data.postId)
      )
      
      console.log(`${data.message}`)
    })

    newSocket.on('postLikeUpdated', (data) => {
      console.log('Post like updated:', data)
      
      setPosts(currentPosts => 
        currentPosts.map(post => 
          post._id === data.post._id ? { ...data.post } : post
        )
      )
      
      console.log(`${data.message}`)

    })

    return () => {
      console.log('Cleaning up socket connection')
      newSocket.disconnect()
    }
  }, []) 

  useEffect(() => {
    const handleProfileUpdate = (event: Event) => {
      const customEvent = event as CustomEvent
      const details = customEvent.detail
      
      console.log('Profile updated event received in Home page', details)
      
      setLastUpdate(Date.now())
      
      if (details?.usernameChanged) {
        setTimeout(() => {
          fetchPosts()
        }, 500) 
      } else {
        fetchPosts()
      }
    }

    window.addEventListener('profileUpdated', handleProfileUpdate)

    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate)
    }
  }, [fetchPosts])

  useEffect(() => {
    fetchPosts()
  }, [lastUpdate, fetchPosts])

  return (
    <div className="w-full py-6">
      <div className="w-full max-w-3xl mx-auto space-y-4 transform -translate-x-28">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
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
                numOfLikes={post.numOfLikes}
                likedBy={post.likedBy}
                currentUser={user.username ? { username: user.username } : undefined}
              />
            </BlurFade>
          ))
        )}
      </div>
    </div>
  )
}