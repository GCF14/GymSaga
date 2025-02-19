import { useContext } from 'react';
import { PostsContext } from '@/context/PostsContext'; 

export const usePostsContext = () => {
  const context = useContext(PostsContext);

  if (!context) {
    throw new Error('usePostsContext must be used within a PostsContextProvider');
  }
  
  return context;
};
