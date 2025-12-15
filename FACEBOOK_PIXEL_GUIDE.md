# 📊 Configuration du Pixel Facebook - LeekPay

## ✅ Configuration effectuée

Le Pixel Facebook **2428692480923365** a été configuré avec succès dans votre application LeekPay.

### Fichiers modifiés/créés :

1. **`plugins/facebook-pixel.client.ts`** - Plugin qui initialise le pixel automatiquement
2. **`nuxt.config.ts`** - Ajout du fallback noscript pour les utilisateurs sans JavaScript
3. **`composables/useFacebookPixel.ts`** - Utilitaire pour tracker des événements facilement

---

## 🎯 Fonctionnement

### Tracking automatique
- ✅ **PageView** : Chaque page visitée est automatiquement trackée
- ✅ **Chargement optimisé** : Le script se charge de manière asynchrone
- ✅ **Fallback noscript** : Même sans JavaScript, le pixel fonctionne

---

## 🚀 Comment utiliser le tracking d'événements

### Dans vos composants Vue

```vue
<script setup>
const { trackPurchase, trackLead, trackCompleteRegistration } = useFacebookPixel();

// Exemple 1 : Tracker un achat
const handlePaymentSuccess = (amount, transactionId) => {
  trackPurchase(amount, 'XOF', {
    transaction_id: transactionId,
    content_type: 'product'
  });
};

// Exemple 2 : Tracker une inscription
const handleRegistration = () => {
  trackCompleteRegistration({
    content_name: 'User Registration',
    status: 'completed'
  });
};

// Exemple 3 : Tracker un lead (création de lien)
const handleLinkCreation = () => {
  trackLead({
    content_name: 'Payment Link Created',
    value: 0
  });
};
</script>
```

---

## 📝 Événements disponibles

### Événements standards Facebook

| Fonction | Usage | Paramètres |
|----------|-------|------------|
| `trackPurchase(value, currency, params)` | Achat complété | Montant, devise (XOF par défaut) |
| `trackInitiateCheckout(value, currency, params)` | Début du processus de paiement | Montant optionnel |
| `trackAddPaymentInfo(params)` | Informations de paiement ajoutées | Paramètres personnalisés |
| `trackCompleteRegistration(params)` | Inscription complétée | Paramètres personnalisés |
| `trackLead(params)` | Lead généré | Paramètres personnalisés |
| `trackViewContent(contentName, params)` | Contenu consulté | Nom du contenu |

### Événements personnalisés

```javascript
const { trackCustomEvent } = useFacebookPixel();

// Tracker un événement personnalisé
trackCustomEvent('LinkShared', {
  link_id: '123',
  share_method: 'whatsapp'
});
```

---

## 💡 Exemples d'intégration recommandés

### 1. Page de succès de paiement (`pages/payment/success.vue`)

```vue
<script setup>
const { trackPurchase } = useFacebookPixel();

onMounted(() => {
  const transaction = getTransactionFromUrl();
  if (transaction) {
    trackPurchase(transaction.amount, 'XOF', {
      transaction_id: transaction.id,
      content_name: 'Payment Link Purchase'
    });
  }
});
</script>
```

### 2. Page d'inscription (`pages/register.vue`)

```vue
<script setup>
const { trackCompleteRegistration } = useFacebookPixel();

const handleSubmit = async () => {
  // ... votre logique d'inscription
  await registerUser();
  
  // Tracker l'inscription
  trackCompleteRegistration({
    content_name: 'LeekPay Registration'
  });
};
</script>
```

### 3. Page de création de lien (`pages/dashboard/create-link.vue`)

```vue
<script setup>
const { trackLead, trackInitiateCheckout } = useFacebookPixel();

const createPaymentLink = async () => {
  // Début de la création
  trackInitiateCheckout(formData.amount, 'XOF');
  
  // ... création du lien
  const link = await api.createLink(formData);
  
  // Lien créé avec succès
  trackLead({
    content_name: 'Payment Link Created',
    value: formData.amount
  });
};
</script>
```

---

## 🔍 Vérification

Pour vérifier que le pixel fonctionne :

1. **Extension Facebook Pixel Helper** (Chrome/Firefox)
   - Installez l'extension "Facebook Pixel Helper"
   - Visitez votre site
   - L'icône devrait afficher le pixel ID : **2428692480923365**

2. **Console développeur**
   ```javascript
   // Dans la console du navigateur
   fbq('track', 'PageView'); // Devrait fonctionner
   ```

3. **Events Manager Facebook**
   - Allez sur [Facebook Events Manager](https://business.facebook.com/events_manager)
   - Sélectionnez votre pixel
   - Vérifiez les événements en temps réel dans "Test Events"

---

## ⚠️ Important

- Le pixel se charge uniquement côté client (`.client.ts`)
- Les événements ne sont trackés que si JavaScript est activé
- Le fallback `noscript` assure un tracking minimal même sans JS
- Toutes les fonctions vérifient l'existence de `fbq` avant l'appel

---

## 🎯 Prochaines étapes recommandées

1. ✅ Tester le pixel avec Facebook Pixel Helper
2. ✅ Intégrer le tracking sur la page de succès de paiement
3. ✅ Ajouter le tracking des inscriptions
4. ✅ Configurer des audiences personnalisées dans Facebook Ads
5. ✅ Créer des événements de conversion dans Events Manager

---

**Pixel ID configuré : `2428692480923365`**

Tout est prêt à être utilisé ! 🚀
