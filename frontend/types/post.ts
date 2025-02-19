// @/types/post.ts

export interface Post {
    _id: string;
    content: string;
    username: string;
    numOfLikes: number;
    likedBy: Array<string>;
    createdAt: string;
  }
  
  // Define the structure of the state
  export interface PostsState {
    posts: Post[] | null;
  }
  
  // Define the structure of the actions for the reducer
  export type PostsAction =
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'CREATE_POSTS'; payload: Post }
  | { type: 'DELETE_POSTS'; payload: Post};
  
  // Define the context value
  export interface PostsContextValue extends PostsState {
    dispatch: React.Dispatch<PostsAction>;
  }
  