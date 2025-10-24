// composables/useAuth.ts
export const useAuth = () => {
    const token = useCookie<string | null>('leekpay_token', { 
        sameSite: 'strict',
        default: () => null,
        httpOnly: false,
        secure: false
    })
    const user = useCookie<any | null>('leekpay_user', { 
        sameSite: 'strict',
        default: () => null,
        httpOnly: false,
        secure: false
    })

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

    // Mise à jour du profil
    const updateProfile = async (profileData: { name?: string, email?: string }) => {
        const config = useRuntimeConfig()
        const response = await $fetch<{
            success: boolean
            message: string
            user?: any
        }>('/profile', {
            method: 'PUT',
            baseURL: config.public.apiBaseURL,
            headers: {
                Authorization: `Bearer ${token.value}`
            },
            body: profileData
        })
        
        // Mettre à jour les données utilisateur en cookie
        if (response.user) {
            user.value = response.user
        }
        
        return response
    }

    // Changement de mot de passe
    const changePassword = async (passwordData: { current_password: string, password: string, password_confirmation: string }) => {
        const config = useRuntimeConfig()
        const response = await $fetch<{
            success: boolean
            message: string
        }>('/profile/password', {
            method: 'PUT',
            baseURL: config.public.apiBaseURL,
            headers: {
                Authorization: `Bearer ${token.value}`
            },
            body: passwordData
        })
        
        return response
    }

    return {
        token,
        user,
        setAuth,
        clearAuth,
        logout,
        updateProfile,
        changePassword,
    }
}
