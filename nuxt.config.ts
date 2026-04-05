// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: process.env.NODE_ENV !== 'production' },
    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [tailwindcss()],
        build: {
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            if (id.includes('chart.js') || id.includes('vue-chartjs')) return 'charts'
                            if (id.includes('tiptap') || id.includes('vue-quill')) return 'editors'
                            if (id.includes('posthog')) return 'analytics'
                        }
                    },
                },
            },
        },
    },

    app: {
        head: {
            meta: [
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes'
                }
            ],
            link: [
                {
                    rel: 'icon',
                    type: 'image/png',
                    href: '/favicon.png'
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.googleapis.com',
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com',
                    crossorigin: '',
                },
                {
                    rel: 'preload',
                    href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Bowlby+One&display=swap',
                    as: 'style',
                    onload: "this.onload=null;this.rel='stylesheet'",
                },
            ],
            noscript: [
                {
                    innerHTML: '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=2428692480923365&ev=PageView&noscript=1" />'
                }
            ]
        },
    },
    runtimeConfig: {
        public: {
            apiBaseURL: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://leekpay.fr/api'
        }
    },
    modules: ['@vueuse/motion/nuxt', '@posthog/nuxt'],
    nitro: {
        compressPublicAssets: true,
        routeRules: {
            '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
            '/assets/**': { headers: { 'cache-control': 'public, max-age=86400' } },
        },
    },
    posthogConfig: {
        publicKey: process.env.NUXT_PUBLIC_POSTHOG_KEY || 'phc_PEiTpBpNA9SBYRvuBaVQcRKQZaF710xKwYcRfzoC0Ln',
        host: 'https://us.i.posthog.com',
    },
})
