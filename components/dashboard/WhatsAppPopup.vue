<template>
  <Transition name="fade">
    <div
      v-if="showPopup"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] p-4"
      @click.self="closePopup"
    >
      <div class="bg-white w-full max-w-sm border border-gray-200">
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <h3 class="font-medium text-gray-900">Canal WhatsApp</h3>
            </div>
            <button
              @click="closePopup"
              class="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fermer"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p class="text-sm text-gray-500 mb-6">
            Recevez les nouveautés, mises à jour et annonces importantes directement sur WhatsApp.
          </p>

          <div class="flex gap-3">
            <button
              @click="closePopup"
              class="flex-1 py-2.5 text-sm text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Plus tard
            </button>
            <a
              href="https://whatsapp.com/channel/0029VbBueEm0gcfR66LvIC2a"
              target="_blank"
              rel="noopener noreferrer"
              @click="handleSubscribe"
              class="flex-1 py-2.5 text-sm text-white bg-gray-900 hover:bg-gray-800 transition-colors text-center"
            >
              Rejoindre
            </a>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showPopup = ref(false)

const closePopup = () => {
  showPopup.value = false
  // Marquer comme vu pour ne plus afficher pendant 7 jours
  localStorage.setItem('whatsapp_popup_closed', Date.now().toString())
}

const handleSubscribe = () => {
  // Marquer comme abonné (ne plus jamais afficher)
  localStorage.setItem('whatsapp_subscribed', 'true')
  showPopup.value = false
}

onMounted(() => {
  // Vérifier si l'utilisateur a déjà vu le popup ou s'est abonné
  const subscribed = localStorage.getItem('whatsapp_subscribed')
  const lastClosed = localStorage.getItem('whatsapp_popup_closed')
  
  if (subscribed === 'true') {
    return // Ne jamais afficher si déjà abonné
  }
  
  if (lastClosed) {
    const daysSinceClosed = (Date.now() - parseInt(lastClosed)) / (1000 * 60 * 60 * 24)
    if (daysSinceClosed < 3) {
      return // Ne pas afficher si fermé il y a moins de 3 jours
    }
  }
  
  // Afficher le popup après un court délai pour une meilleure UX
  setTimeout(() => {
    showPopup.value = true
  }, 1500)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .bg-white,
.fade-leave-active .bg-white {
  transition: transform 0.3s ease;
}

.fade-enter-from .bg-white {
  transform: scale(0.95);
}

.fade-leave-to .bg-white {
  transform: scale(0.95);
}
</style>
