/** @type {import('tailwindcss').Config} */
export default {
    // ⚠️ IMPORTANT : On utilise une fonction pour 'content' afin de forcer le scan correct sous Vite
    content: [
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './app.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
    ],
    theme: {
        extend: {
            colors: {
                'leek-green': '#2ECC71',
                'leek-blue': '#0A1F44',
                'leek-orange': '#F39C12',
                'leek-white': '#FFFFFF',
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [],
    
}