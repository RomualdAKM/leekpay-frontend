<template>
  <Transition name="fade">
    <div
      v-if="showPopup"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      @click.self="closePopup"
    >
      <div class="bg-white rounded-md shadow-xl w-full max-w-md overflow-hidden">
        <!-- Header avec gradient -->
        <div class="bg-green-600 p-4 text-white relative">
          <button
            @click="closePopup"
            class="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-1">Restez informé !</h3>
              <p class="text-white/90 text-sm">Rejoignez notre canal WhatsApp</p>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6">
          <p class="text-gray-600 mb-6 leading-relaxed">
            Soyez les premiers à découvrir nos <strong>nouvelles fonctionnalités</strong>, 
            <strong>mises à jour</strong> et <strong>astuces exclusives</strong> pour optimiser 
            votre expérience LeekPay.
          </p>

          <div class="space-y-3 mb-6">
            <div class="flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p class="text-sm text-gray-700">Nouveautés en avant-première</p>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p class="text-sm text-gray-700">Conseils et astuces pratiques</p>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p class="text-sm text-gray-700">Annonces importantes</p>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex flex-col gap-3">
            <a
              href="https://whatsapp.com/channel/0029VbBueEm0gcfR66LvIC2a"
              target="_blank"
              rel="noopener noreferrer"
              @click="handleSubscribe"
              class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-md"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Rejoindre le canal
            </a>
            <button
              @click="closePopup"
              class="w-full text-gray-600 hover:text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors text-sm"
            >
              Plus tard
            </button>
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
