import { useAuthContext } from '@/hooks/useAuthContext';
import { useState } from 'react';

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()
    const port = process.env.NEXT_PUBLIC_PORT


    const login = async (email: string, password: string) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:${port}/api/users/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
            credentials: 'include'  // Allow cookies
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok) {
            
            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)

        }
    }

    return { login, error, isLoading }
}