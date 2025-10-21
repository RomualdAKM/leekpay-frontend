// composables/useAuth.ts
export const useAuth = () => {
    const token = useCookie<string | null>('leekpay_token', { sameSite: 'strict' })
    const user = useCookie<any | null>('leekpay_user', { sameSite: 'strict' })

    const setAuth = (newToken: string, newUser: any) => {
        token.value = newToken
        user.value = newUser
    }

    const clearAuth = () => {
        token.value = null
        user.value = null
    }

    // Déconnexion
    const logout = async () => {
        const config = useRuntimeConfig()
        await $fetch('/logout', {
            method: 'POST',
            baseURL: config.public.apiBaseURL,
            headers: {
                Authorization: `Bearer ${token.value}`
            }
        })
        clearAuth()
    }

    return {
        token,
        user,
        setAuth,
        clearAuth,
        logout,
    }
}
