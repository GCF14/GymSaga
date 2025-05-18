import { useAuthContext } from '@/hooks/useAuthContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = async () => {

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`, {
                method: 'POST',
                credentials: 'include'  // Allow cookies
            })

            if (response.ok) {
                dispatch({type: 'LOGOUT'})
                localStorage.removeItem('username')
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }

    }

    return { logout }
}