import { useAuthContext } from '@/hooks/useAuthContext';
import { useState } from 'react';

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()
    const port = process.env.NEXT_PUBLIC_PORT


    const signup = async (email: string, password: string) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:${port}/api/users/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            
            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)

        }
    }

    return { signup, error, isLoading}
}