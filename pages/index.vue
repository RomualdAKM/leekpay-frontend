<template>
  <div class="font-sans">
    <!-- Hero Section (2 colonnes : texte + image) -->
    <section class="py-20 px-6 md:px-12 bg-white">
      <div class="container mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Colonne Texte -->
          <div>
            <h1 class="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Générez des liens de paiement et recevez vos paiements partout, instantanément.
            </h1>
            <button class="bg-amber-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-amber-600 transition mt-6 shadow-md">
              Démarrer
            </button>
          </div>
          <!-- Colonne Image (Placeholder pour vous) -->
          <div class="bg-gray-200 h-80 rounded-xl flex items-center justify-center">
            <span class="text-gray-500">[Insérez votre illustration ici]</span>
          </div>
        </div>

        <!-- Sous-section : "Dans quels cas utiliser LeekPay ?" -->
        <div class="mt-24 grid md:grid-cols-2 gap-12 items-center">
          <!-- Colonne Image (Placeholder pour vous) -->
          <div class="bg-gray-200 h-64 rounded-xl flex items-center justify-center order-2 md:order-1">
            <span class="text-gray-500">[Insérez votre visuel ici]</span>

          </div>
          <!-- Colonne Texte -->
          <div class="order-1 md:order-2">
            <h2 class="text-2xl font-semibold text-slate-900 mb-8">Dans quels cas utiliser LeekPay ?</h2>
            <div class="space-y-6">
              <!-- Cas 1 -->
              <div class="bg-white p-6 rounded-lg border border-gray-200">
                <h3 class="text-xl font-bold text-slate-900 mb-2">Formations & Consultations</h3>
                <p class="text-gray-600">Encaissez vos frais de formation, ateliers ou consultations en toute simplicité.</p>
              </div>
              <!-- Cas 2 -->
              <div class="bg-white p-6 rounded-lg border border-gray-200">
                <h3 class="text-xl font-bold text-slate-900 mb-2">Réseaux Sociaux</h3>
                <p class="text-gray-600">Partagez un lien de paiement directement aux étudiants ou clients via WhatsApp, Instagram, etc.</p>
              </div>
              <!-- Cas 3 -->
              <div class="bg-white p-6 rounded-lg border border-gray-200">
                <h3 class="text-xl font-bold text-slate-900 mb-2">Services & Prestations Diverses</h3>
                <p class="text-gray-600">Offrez la possibilité de régler par Mobile Money ou carte bancaire, avec un suivi instantané et sécurisé.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Adoption -->
    <section class="py-16 px-6 md:px-12 bg-gray-50">
      <div class="container mx-auto text-center">
        <h2 class="text-2xl font-bold text-slate-900 mb-12">LeekPay, adopté en Afrique et au-delà.</h2>
        <div class="flex justify-center items-center space-x-12 flex-wrap gap-8">
          <div class="h-12 w-32 bg-gray-300 rounded flex items-center justify-center">
            <span class="text-xs text-gray-600">rzeyow</span>
          </div>
          <div class="h-12 w-32 bg-gray-300 rounded flex items-center justify-center">
            <span class="text-xs text-gray-600">Ccnlblix</span>
          </div>
          <div class="h-12 w-32 bg-gray-300 rounded flex items-center justify-center">
            <span class="text-xs text-gray-600">2ReventePro</span>
          </div>
          <div class="h-12 w-32 bg-gray-300 rounded flex items-center justify-center">
            <span class="text-xs text-gray-600">Tama</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Fonctionnalités (avec visuels à gauche) -->
    <section class="py-20 px-6 md:px-12 bg-white">
      <div class="container mx-auto">
        <div class="space-y-20">
          <!-- Fonctionnalité 1 -->
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="bg-gray-200 h-64 rounded-xl flex items-center justify-center">
              <span class="text-gray-500">[Visuel fonctionnalité 1]</span>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-slate-900 mb-4">Création de liens</h3>
              <p class="text-gray-600 leading-relaxed">De la création du lien au retrait de vos fonds, tout devient facile. Personnalisez vos liens : montant fixe ou libre, description, image.</p>
            </div>
          </div>
          <!-- Fonctionnalité 2 -->
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="bg-gray-200 h-64 rounded-xl flex items-center justify-center order-2 md:order-1">
              <span class="text-gray-500">[Visuel fonctionnalité 2]</span>
            </div>
            <div class="order-1 md:order-2">
              <h3 class="text-2xl font-bold text-slate-900 mb-4">Retraits rapides et flexibles</h3>
              <p class="text-gray-600 leading-relaxed">Retirez vos fonds facilement via Mobile Money ou carte bancaire, avec historique détaillé et confirmation instantanée.</p>
            </div>
          </div>
          <!-- Fonctionnalité 3 -->
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="bg-gray-200 h-64 rounded-xl flex items-center justify-center">
              <span class="text-gray-500">[Visuel fonctionnalité 3]</span>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-slate-900 mb-4">Suivi et gestion en temps réel</h3>
              <p class="text-gray-600 leading-relaxed">Gardez toujours un œil sur vos performances : chiffre d’affaires, montants collectés. Un tableau de bord simple et intuitif.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Comment ça marche (étapes + illustration à droite) -->
    <section class="py-20 px-6 md:px-12 bg-green-50">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-slate-900 mb-16 text-center">Comment ça marche ?</h2>
        <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <!-- Étape 1 -->
              <div class="bg-white p-6 rounded-xl shadow-md text-center">
                <div class="w-12 h-12 bg-green-400 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">Créez</h3>
                <p class="text-gray-600 text-sm">Personnalisez votre lien de paiement</p>
              </div>
              <!-- Étape 2 -->
              <div class="bg-white p-6 rounded-xl shadow-md text-center">
                <div class="w-12 h-12 bg-green-400 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">Partagez</h3>
                <p class="text-gray-600 text-sm">Diffusez-le par WhatsApp, email, réseaux sociaux...</p>
              </div>
              <!-- Étape 3 -->
              <div class="bg-white p-6 rounded-xl shadow-md text-center">
                <div class="w-12 h-12 bg-green-400 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">Encaissez</h3>
                <p class="text-gray-600 text-sm">Recevez vos paiements instantanément et suivez votre tableau de bord en temps réel.</p>
              </div>
            </div>
          </div>
          <!-- Illustration à droite -->
          <div class="bg-gray-200 h-80 rounded-xl flex items-center justify-center">
            <span class="text-gray-500">[Illustration processus]</span>
          </div>
        </div>
        <div class="text-center">
          <button class="bg-amber-500 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-amber-600 transition shadow-lg">
            Démarrer
          </button>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 px-6 md:px-12 bg-white">
      <div class="container mx-auto max-w-3xl">
        <h2 class="text-3xl font-bold text-center text-slate-900 mb-16">Questions fréquemment posées</h2>
        <div class="space-y-6">
          <div v-for="(faq, index) in faqs" :key="index" class="border-b border-gray-200 pb-6">
            <div class="flex items-start cursor-pointer group">
              <span class="text-green-400 mr-3 text-lg mt-1">+</span>
              <div>
                <h3 class="text-lg font-medium text-slate-900 group-hover:text-green-400 transition">{{ faq.question }}</h3>
                <p class="text-gray-600 mt-3 leading-relaxed">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-12">
          <h3 class="text-xl font-semibold text-slate-900 mb-4">Écrivez-nous</h3>
          <form class="max-w-md mx-auto flex">
            <input
                type="email"
                placeholder="Votre email"
                class="flex-grow px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
                type="submit"
                class="bg-green-400 text-white px-6 py-3 rounded-r-md hover:bg-green-500 transition font-medium"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const faqs = [
  {
    question: "Qu'est-ce qu'un lien de paiement ?",
    answer: "C'est un lien unique et sécurisé que vous générez pour recevoir un paiement spécifique, sans avoir besoin d'un site web ou d'une boutique en ligne."
  },
  {
    question: "Où puis-je utiliser un lien de paiement LeekPay ?",
    answer: "Partout ! Sur WhatsApp, par email, sur les réseaux sociaux (Facebook, Instagram), dans vos stories, ou même en SMS. Le lien fonctionne sur tous les appareils."
  },
  {
    question: "Puis-je personnaliser mon lien de paiement ?",
    answer: "Oui, absolument. Vous pouvez ajouter une description détaillée, fixer un montant (ou laisser le choix au client), ajouter une image ou un logo, et même personnaliser l'URL."
  },
  {
    question: "Comment suivre mes paiements ?",
    answer: "Via votre tableau de bord LeekPay en temps réel. Vous y voyez tous les paiements reçus, les montants, les dates, les statuts et pouvez exporter les données."
  },
  {
    question: "Comment retirer mes fonds ?",
    answer: "En quelques clics depuis votre tableau de bord. Choisissez entre un virement vers votre compte Mobile Money (Orange Money, MTN Mobile Money, etc.) ou vers votre carte bancaire."
  },
  {
    question: "Est-ce sécurisé ?",
    answer: "Oui, la sécurité est notre priorité. Toutes les transactions sont cryptées, et nous respectons les normes PCI DSS. Vos fonds sont protégés et vos données confidentielles."
  }
]
</script>