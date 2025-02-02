import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext'; 

export const useWorkoutsContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within a AuthContextProvider');
  }

  return context;
};
