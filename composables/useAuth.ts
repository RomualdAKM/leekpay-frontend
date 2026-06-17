// composables/useAuth.ts
export const useAuth = () => {
    // secure: true en production (cookies envoyés uniquement sur HTTPS) ; false en
    // dev local (HTTP) pour ne pas casser la connexion. httpOnly reste false car le
    // token est lu en JS pour l'en-tête Authorization (l'AUTORISATION réelle est
    // côté serveur : le rôle du cookie 'user' n'est JAMAIS une source de confiance).
    const token = useCookie<string | null>('leekpay_token', {
        sameSite: 'strict',
        default: () => null,
        httpOnly: false,
        secure: !import.meta.dev
    })
    const user = useCookie<any | null>('leekpay_user', {
        sameSite: 'strict',
        default: () => null,
        httpOnly: false,
        secure: !import.meta.dev
    })

    const setAuth = (newToken: string, newUser: any) => {
        token.value = newToken
        user.value = newUser
    }

    const clearAuth = () => {
        token.value = null
        user.value = null
    }

    // Vérifier l'authentification et rediriger si nécessaire
    const requireAuth = () => {
        if (process.client && !token.value) {
            navigateTo('/login')
            return false
        }
        return true
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

    // Vérifier si l'utilisateur est admin
    const isAdmin = computed(() => {
        return user.value?.role === 'admin'
    })

    // Vérifier si l'utilisateur a un rôle spécifique
    const hasRole = (role: string) => {
        return user.value?.role === role
    }

    return {
        token,
        user,
        isAdmin,
        setAuth,
        clearAuth,
        logout,
        updateProfile,
        changePassword,
        hasRole,
        requireAuth,
    }
}
