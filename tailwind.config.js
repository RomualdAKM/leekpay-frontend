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
                display: ['Bowlby One', 'cursive'],
            },
            // Animations pour les blocs de page de vente
            animation: {
                'fade': 'fadeIn var(--animation-duration, 0.5s) ease-out var(--animation-delay, 0s) both',
                'slide-up': 'slideUp var(--animation-duration, 0.5s) ease-out var(--animation-delay, 0s) both',
                'scale': 'scaleIn var(--animation-duration, 0.5s) ease-out var(--animation-delay, 0s) both',
                'bounce': 'bounceIn var(--animation-duration, 0.6s) cubic-bezier(0.68, -0.55, 0.265, 1.55) var(--animation-delay, 0s) both',
                'slide-down': 'slideDown var(--animation-duration, 0.5s) ease-out var(--animation-delay, 0s) both',
                'slide-left': 'slideLeft var(--animation-duration, 0.5s) ease-out var(--animation-delay, 0s) both',
                'slide-right': 'slideRight var(--animation-duration, 0.5s) ease-out var(--animation-delay, 0s) both',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideLeft: {
                    '0%': { opacity: '0', transform: 'translateX(30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideRight: {
                    '0%': { opacity: '0', transform: 'translateX(-30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                bounceIn: {
                    '0%': { opacity: '0', transform: 'scale(0.3)' },
                    '50%': { opacity: '0.9', transform: 'scale(1.05)' },
                    '80%': { transform: 'scale(0.98)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [],
    
}