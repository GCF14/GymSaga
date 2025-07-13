import { useAuthContext } from "@/hooks/useAuthContext";
import { useState } from "react";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (
    email: string,
    password: string,
    username: string,
    firstName: string,
    lastName: string
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          username,
          firstName,
          lastName,
        }),
        credentials: "include", // Allow cookies
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      return false;
    }

    if (response.ok) {
      // update the auth context
      dispatch({ type: "LOGIN", payload: json });
      localStorage.setItem("username", username);

      setIsLoading(false);
      return true;
    }
  };

  return { signup, error, isLoading };
};
