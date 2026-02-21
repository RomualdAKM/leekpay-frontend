import { defineNuxtPlugin } from '#app'
import { MotionDirective } from '@vueuse/motion'

export default defineNuxtPlugin((nuxtApp) => {
  // Enregistrer la directive v-motion pour le SSR
  nuxtApp.vueApp.directive('motion', MotionDirective)
  
  // Directive v-motion-visibility simplifiée pour SSR
  nuxtApp.vueApp.directive('motion-visibility', {
    getSSRProps() {
      // Retourner des props vides pour le SSR
      return {}
    },
    mounted(el, binding) {
      // Côté client, utiliser IntersectionObserver
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.classList.add('motion-visible')
              // Déclencher l'animation
              const motion = el.__motion__
              if (motion && binding.value) {
                motion.apply(binding.value)
              }
            }
          })
        },
        {
          threshold: binding.value?.threshold || 0.1,
          once: binding.value?.once !== false,
        }
      )
      
      observer.observe(el)
      el.__intersectionObserver__ = observer
    },
    unmounted(el) {
      if (el.__intersectionObserver__) {
        el.__intersectionObserver__.disconnect()
      }
    },
  })
})
