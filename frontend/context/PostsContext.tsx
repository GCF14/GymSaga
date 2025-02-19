"use client";
import { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { PostsAction, PostsState } from '@/types/post'; // Ensure to import from the correct path

const initialState: PostsState = {
  posts: null, // Initialize as null
};

// Reducer function
const postsReducer = (state: PostsState, action: PostsAction): PostsState => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        posts: action.payload, 
      };
    case 'CREATE_POSTS':
      return {
        posts: state.posts ? [action.payload, ...state.posts] : [action.payload], 
      };
    case 'DELETE_POSTS':
      return { 
        posts: state.posts ? state.posts.filter((p) => p._id !== action.payload._id) : null,
      };
    default:
      return state;
  }
};

// Context value type
export interface PostsContextValue extends PostsState {
  dispatch: Dispatch<PostsAction>;
}

// Create the context with the correct type
export const PostsContext = createContext<PostsContextValue | undefined>(undefined);

interface PostsContextProviderProps {
  children: ReactNode;
}

export const PostsContextProvider = ({ children }: PostsContextProviderProps) => {
  const [state, dispatch] = useReducer(postsReducer, initialState);

  return (
    <PostsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PostsContext.Provider>
  );
};
