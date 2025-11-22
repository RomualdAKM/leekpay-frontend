<template>
  <div class="p-4 sm:p-6 space-y-6">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-xl sm:text-2xl font-bold mb-2" style="color: #0A1F44">Support</h1>
      <p class="text-gray-600 text-sm sm:text-base">Notre équipe est là pour vous aider. Contactez-nous via WhatsApp ou par email.</p>
    </div>

    <!-- Contact Options -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <!-- WhatsApp Card -->
      <Card class="hover:shadow-md transition-shadow">
        <div class="flex flex-col h-full">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-base sm:text-lg" style="color: #0A1F44">WhatsApp</h3>
              <p class="text-xs sm:text-sm text-gray-500">Réponse rapide</p>
            </div>
          </div>
          
          <p class="text-sm text-gray-600 mb-4 flex-grow">
            Discutez directement avec notre équipe support via WhatsApp pour une assistance immédiate.
          </p>
          
          <div class="space-y-3">
            <div class="flex items-center gap-2 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span class="text-gray-700 font-medium">+221 78 781 45 72</span>
            </div>
            
            <a
              href="https://wa.me/221787814572?text=Bonjour,%20j'ai%20besoin%20d'aide%20concernant%20LeekPay"
              target="_blank"
              rel="noopener noreferrer"
              class="block w-full bg-green-600 text-white py-3 px-4 rounded-sm font-medium hover:bg-green-700 transition text-center text-sm sm:text-base"
            >
              Ouvrir WhatsApp
            </a>
          </div>
        </div>
      </Card>

      <!-- Email Card -->
      <Card class="hover:shadow-md transition-shadow">
        <div class="flex flex-col h-full">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-base sm:text-lg" style="color: #0A1F44">Email</h3>
              <p class="text-xs sm:text-sm text-gray-500">Support détaillé</p>
            </div>
          </div>
          
          <p class="text-sm text-gray-600 mb-4 flex-grow">
            Envoyez-nous un email détaillé et notre équipe vous répondra dans les plus brefs délais.
          </p>
          
          <div class="space-y-3">
            <div class="flex items-center gap-2 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              <span class="text-gray-700 font-medium">support@leekpay.me</span>
            </div>
            
            <a
              href="mailto:support@leekpay.me?subject=Demande de support LeekPay"
              class="block w-full bg-blue-600 text-white py-3 px-4 rounded-sm font-medium hover:bg-blue-700 transition text-center text-sm sm:text-base"
            >
              Envoyer un email
            </a>
          </div>
        </div>
      </Card>
    </div>

    <!-- FAQ Section -->
    <Card>
      <div class="flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="font-semibold text-base sm:text-lg" style="color: #0A1F44">Questions fréquentes</h3>
      </div>
      
      <div class="space-y-4">
        <div class="border-l-4 border-green-500 pl-4 py-2">
          <h4 class="font-medium text-sm sm:text-base text-gray-900 mb-1">Quels sont les horaires du support ?</h4>
          <p class="text-xs sm:text-sm text-gray-600">Notre équipe est disponible 24h/24 et 7j/7 pour vous accompagner à tout moment.</p>
        </div>
        
        <div class="border-l-4 border-green-500 pl-4 py-2">
          <h4 class="font-medium text-sm sm:text-base text-gray-900 mb-1">Quel est le délai de réponse ?</h4>
          <p class="text-xs sm:text-sm text-gray-600">Via WhatsApp, vous recevrez généralement une réponse en quelques minutes.</p>
        </div>
        
        <div class="border-l-4 border-green-500 pl-4 py-2">
          <h4 class="font-medium text-sm sm:text-base text-gray-900 mb-1">Quelles informations fournir ?</h4>
          <p class="text-xs sm:text-sm text-gray-600">Pour un traitement rapide, merci de préciser votre email d'inscription, la nature de votre demande et si possible des captures d'écran.</p>
        </div>
      </div>
    </Card>

    <!-- Additional Info -->
    <div class="bg-gray-50 border border-gray-200 rounded-md p-4">
      <div class="flex items-start gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h4 class="font-medium text-sm sm:text-base text-gray-900 mb-1">Besoin d'aide urgente ?</h4>
          <p class="text-xs sm:text-sm text-gray-600">
            Pour les problèmes urgents concernant vos transactions ou votre compte, privilégiez WhatsApp pour une réponse immédiate.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})

// Import des composants UI
import Card from "~/components/ui/Card.vue"
</script>
