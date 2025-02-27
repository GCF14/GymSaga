import { useState } from "react"
import { usePostsContext } from "@/hooks/usePostsContext"; // Updated import
import { useAuthContext } from "@/hooks/useAuthContext";


const port = process.env.NEXT_PUBLIC_PORT;

const PostForm = () => {

    const { dispatch } = usePostsContext ()
    const [content, setContent] = useState('')
    const[username, setUsername] = useState('')
    
    // const[numOfLikes, setNumOfLikes] = useState('')
    // const[likedBy, setLikedBy] = useState('')

    const [error, setError] = useState<string | null>(null);
    const [emptyFields, setEmptyFields] = useState<string[]>([]);
    const { user } = useAuthContext();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!user) {
            setError("You must be logged in")
            return
        }
        const post = {content, username}

        const response = await fetch(`http://localhost:${port}/api/posts`, {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                "Content-Type": 'application/json'
            },  
            //credentials: "include", 
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok) {
            setContent('')
            setUsername('')
            // setNumOfLikes('')
            // setLikedBy('')
            setError(null)
            setEmptyFields([])
            console.log('New post has been created', json)
            dispatch({type: 'CREATE_POSTS', payload: json})
        }
    };

// note: change username label later
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create a new post</h3>

            <label>Content:</label>
            <input 
                type="text"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                className={emptyFields.includes('content') ? 'error': ''}
            />

            
            <label>Username:</label>
            <input 
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className={emptyFields.includes('username') ? 'error': ''}
            />

            
            <button className="post-button">Add Post</button>
            {error && <div className="error">{error}</div>}
        </form>


    )
}

export default PostForm