import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // v-motion est deja fourni par @vueuse/motion/nuxt.
  // Cette directive ajoute uniquement le declenchement "au scroll".
  nuxtApp.vueApp.directive('motion-visibility', {
    getSSRProps() {
      return {}
    },
    mounted(el, binding) {
      if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
        return
      }

      const once = binding.value?.once !== false
      const threshold = binding.value?.threshold ?? 0.1

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const runVisible = () => {
                const motion = (el as any).__motion__
                if (!motion?.apply) {
                  return false
                }
                // v-motion expose l'instance sur __motion__, on lance la variante "visible".
                motion.apply('visible')
                return true
              }

              if (runVisible()) {
                if (once) {
                  observer.unobserve(el)
                }
                return
              }

              requestAnimationFrame(() => {
                if (runVisible() && once) {
                  observer.unobserve(el)
                }
              })
            }
          })
        },
        {
          threshold,
        }
      )

      observer.observe(el)
      ;(el as any).__intersectionObserver__ = observer
    },
    unmounted(el) {
      const observer = (el as any).__intersectionObserver__
      if (observer) {
        observer.disconnect()
      }
    },
  })
})
