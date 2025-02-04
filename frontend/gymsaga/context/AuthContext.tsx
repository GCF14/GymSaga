'use client'

import { createContext, useReducer, ReactNode } from "react";

// set state to null
interface AuthState {
  user: any | null; 
}

// set action types
type AuthAction = 
  | { type: "LOGIN"; payload: any } 
  | { type: "LOGOUT" };


export const AuthContext = createContext<{
  user: any | null; 
  dispatch: React.Dispatch<AuthAction>;
} | null>(null);


export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};


interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
