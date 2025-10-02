export function useCurrencies() {
    const config = useRuntimeConfig()
    const { token } = useAuth()

    const currencies = ref([])
    const currenciesLoading = ref(true)
    const error = ref(null)

    const fetchCurrencies = async () => {
        try {
            currenciesLoading.value = true
            const response = await $fetch('/currencies', {
                baseURL: config.public.apiBaseURL,
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            })
            currencies.value = response.data || []
        } catch (err) {
            error.value = err.data?.message || 'Erreur lors du chargement des devises.'
            console.error('Erreur devises:', err)
        } finally {
            currenciesLoading.value = false
        }
    }

    const getCurrencySymbol = (currencyId) => {
        const currency = currencies.value.find(c => c.id === currencyId)
        return currency ? currency.symbol : ''
    }

    onMounted(fetchCurrencies)

    return {
        currencies,
        currenciesLoading,
        error,
        fetchCurrencies,
        getCurrencySymbol
    }
}
