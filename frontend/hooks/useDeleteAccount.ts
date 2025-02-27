import { useAuthContext } from '@/hooks/useAuthContext';
import { useState } from 'react';

export const useDeleteAccount = () => {
    const [error, setError] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()
    const port = process.env.NEXT_PUBLIC_PORT


    const deleteAccount = async (id: string) => {
        console.log(`Attempting to delete user with ID: ${id}`);
    
        setIsLoading(true);
        setError(null);
    
        try {
            const response = await fetch(`http://localhost:${port}/api/users/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
    
            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error || "Failed to delete account");
            }
    
            dispatch({ type: "LOGOUT" });
    
            setIsLoading(false);
            console.log("User deleted successfully");
            return true;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
            console.error("Delete error:", errorMessage);
            setError(errorMessage);
            setIsLoading(false);
            return false;
        }
    };
    
    

    return { deleteAccount, error, isLoading }
}