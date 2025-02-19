import { Post } from "@/types/post"; 
import { usePostsContext } from "@/hooks/usePostsContext";
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'

const port = process.env.NEXT_PUBLIC_PORT;

const PostDetails = ({ post }: { post: Post }) => {
    const { dispatch } = usePostsContext();
    


    async function handleClick(){

        const response = await fetch(`http://localhost:${port}/api/posts/` + post._id, {
          method: 'DELETE',
        })
      
        const json = await response.json();
      
        if (response.ok) {
          dispatch({ type: 'DELETE_POSTS', payload: json });
        }
    }
 
    return (
        <div className="post-details">
            <h4>{post.username}</h4>
            <p>{post.content}</p>
            <p><strong>Likes: </strong>{post.numOfLikes}</p>
            <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={() => handleClick()}>delete</span>
        </div>
    )
}

export default PostDetails;