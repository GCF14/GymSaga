import { useAuthContext } from '@/hooks/useAuthContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const port = process.env.NEXT_PUBLIC_PORT

    const logout = async () => {

        try {
            const response = await fetch(`http://localhost:${port}/api/users/logout`, {
                method: 'POST',
                credentials: 'include'  // Allow cookies
            })

            if (response.ok) {
                dispatch({type: 'LOGOUT'})
                sessionStorage.removeItem('user')
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }

    }

    return { logout }
}