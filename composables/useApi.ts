// composables/useApi.ts
export const useApi = () => {
    const config = useRuntimeConfig()
    const { token } = useAuth()

    return $fetch.create({
        baseURL: config.public.apiBaseURL,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token.value ? `Bearer ${token.value}` : ''
        }
    })
}