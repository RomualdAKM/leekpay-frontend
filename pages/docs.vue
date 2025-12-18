<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <!-- <header class="bg-white border-b sticky top-0 z-10">
      <div class="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2">
          <img src="~/assets/img/Logo_de_LeekPay_png_sans_arrière-plan.png" alt="LeekPay" class="h-8" />
          <span class="font-bold text-xl text-gray-900">LeekPay</span>
        </NuxtLink>
        <NuxtLink 
          to="/login" 
          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
        >
          Connexion
        </NuxtLink>
      </div>
    </header> -->

    <!-- Hero -->
    <div class="bg-gradient-to-r from-green-500 to-green-600 text-white py-16">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h1 class="text-4xl font-bold mb-4">Documentation API</h1>
        <p class="text-xl opacity-90">Intégrez LeekPay en quelques minutes</p>
      </div>
    </div>

    <!-- Navigation rapide -->
    <div class="bg-white border-b">
      <div class="max-w-4xl mx-auto px-4">
        <nav class="flex gap-6 overflow-x-auto py-4 text-sm">
          <a href="#demarrage" class="text-gray-600 hover:text-green-600 whitespace-nowrap">Démarrage</a>
          <a href="#widget" class="text-gray-600 hover:text-green-600 whitespace-nowrap">Widget HTML</a>
          <a href="#javascript" class="text-gray-600 hover:text-green-600 whitespace-nowrap">JavaScript</a>
          <a href="#api" class="text-gray-600 hover:text-green-600 whitespace-nowrap">API REST</a>
          <a href="#webhooks" class="text-gray-600 hover:text-green-600 whitespace-nowrap">Webhooks</a>
        </nav>
      </div>
    </div>

    <!-- Contenu -->
    <div class="max-w-4xl mx-auto px-4 py-12">
      
      <!-- Démarrage rapide -->
      <section id="demarrage" class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span class="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">1</span>
          Démarrage rapide
        </h2>
        
        <div class="bg-white rounded-xl  p-6 mb-6">
          <h3 class="font-semibold text-gray-900 mb-4">Obtenez vos clés API</h3>
          <ol class="space-y-3 text-gray-600">
            <li class="flex gap-3">
              <span class="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">1</span>
              <span>Créez un compte sur <a href="/register" class="text-green-600 hover:underline">leekpay.me</a></span>
            </li>
            <li class="flex gap-3">
              <span class="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">2</span>
              <span>Allez dans <strong>Dashboard → Clés API</strong></span>
            </li>
            <li class="flex gap-3">
              <span class="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">3</span>
              <span>Cliquez sur <strong>Nouvelle clé API</strong></span>
            </li>
            <li class="flex gap-3">
              <span class="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">4</span>
              <span>Copiez votre <code class="bg-gray-100 px-2 py-0.5 rounded">sk_live_xxx</code> (clé secrète)</span>
            </li>
          </ol>
        </div>

        <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p class="text-yellow-800 text-sm flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span><strong>Important :</strong> Ne partagez jamais votre clé secrète (<code>sk_xxx</code>). Utilisez-la uniquement côté serveur.</span>
          </p>
        </div>
      </section>

      <!-- Widget HTML -->
      <section id="widget" class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span class="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">2</span>
          Widget HTML
          <span class="text-sm font-normal text-gray-500 ml-2">Le plus simple</span>
        </h2>

        <div class="bg-white rounded-xl  p-6 mb-6">
          <p class="text-gray-600 mb-4">Ajoutez un bouton de paiement en <strong>2 lignes de code</strong> :</p>
          
          <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
            <pre class="text-sm"><code class="text-green-400">&lt;!-- 1. Ajouter le script (une seule fois) --&gt;</code>
<code class="text-white">&lt;script src="https://leekpay.fr/js/leekpay.js"&gt;&lt;/script&gt;</code>

<code class="text-green-400">&lt;!-- 2. Ajouter le bouton --&gt;</code>
<code class="text-white">&lt;button 
  data-leekpay-amount="5000" 
  data-leekpay-currency="XOF"&gt;
  Payer 5000 CFA
&lt;/button&gt;</code></pre>
          </div>

          <p class="text-sm text-gray-500">C'est tout ! Le bouton ouvrira automatiquement une popup de paiement.</p>
        </div>
        
        <div class="bg-white rounded-xl border border-yellow-200 p-6 mb-6">
          <h3 class="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Comment savoir si le paiement a réussi ?
          </h3>
          <p class="text-sm text-gray-600 mb-3">Pour le bouton HTML, ajoutez ce code JavaScript pour être notifié :</p>
          <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre class="text-sm text-white"><code>&lt;script&gt;
                window.addEventListener('message', function(event) {
                // Vérifier l'origine
                if (event.origin !== 'https://leekpay.me') return;
                
                // Paiement réussi
                if (event.data.type === 'leekpay_success') {
                    const tx = event.data.transaction;
                    alert('Merci ! Paiement de ' + tx.amount + ' validé');
                    
                    // Rediriger ou débloquer du contenu
                    window.location.href = '/merci?id=' + tx.id;
                }
                
                // Paiement annulé
                if (event.data.type === 'leekpay_cancel') {
                    console.log('Paiement annulé');
                }
                });
                &lt;/script&gt;</code></pre>
          </div>
          <p class="text-xs text-gray-500 mt-3">
            <strong>Alternative :</strong> Utilisez les <strong>Webhooks</strong> (section 5) pour une notification serveur plus fiable.
          </p>
        </div>

        <div class="bg-white rounded-xl  p-6">
          <h3 class="font-semibold text-gray-900 mb-4">Options disponibles</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b">
                  <th class="text-left py-2 font-medium">Attribut</th>
                  <th class="text-left py-2 font-medium">Description</th>
                  <th class="text-left py-2 font-medium">Exemple</th>
                </tr>
              </thead>
              <tbody class="text-gray-600">
                <tr class="border-b">
                  <td class="py-2"><code class="bg-gray-100 px-1 rounded">data-leekpay-amount</code></td>
                  <td class="py-2">Montant à payer</td>
                  <td class="py-2"><code>"5000"</code></td>
                </tr>
                <tr class="border-b">
                  <td class="py-2"><code class="bg-gray-100 px-1 rounded">data-leekpay-currency</code></td>
                  <td class="py-2">Devise (XOF, EUR, USD)</td>
                  <td class="py-2"><code>"XOF"</code></td>
                </tr>
                <tr class="border-b">
                  <td class="py-2"><code class="bg-gray-100 px-1 rounded">data-leekpay-description</code></td>
                  <td class="py-2">Description du paiement</td>
                  <td class="py-2"><code>"Commande #123"</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- JavaScript -->
      <section id="javascript" class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span class="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm">3</span>
          JavaScript
          <span class="text-sm font-normal text-gray-500 ml-2">Plus de contrôle</span>
        </h2>

        <div class="bg-white rounded-xl  p-6 mb-6">
          <p class="text-gray-600 mb-4">Pour plus de contrôle, utilisez l'API JavaScript :</p>
          
          <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
            <pre class="text-sm text-white"><code>&lt;script src="https://leekpay.fr/js/leekpay.js"&gt;&lt;/script&gt;
&lt;script&gt;
  function payer() {
    LeekPay.checkout({
      amount: 5000,
      currency: 'XOF',
      description: 'Achat sur mon site',
      
      // Callbacks (optionnels)
      onSuccess: function(transaction) {
        console.log('Paiement réussi!', transaction);
        // Rediriger vers page de confirmation
        window.location.href = '/merci?tx=' + transaction.id;
      },
      onCancel: function() {
        console.log('Paiement annulé');
      }
    });
  }
&lt;/script&gt;

&lt;button onclick="payer()"&gt;Payer maintenant&lt;/button&gt;</code></pre>
          </div>
        </div>

        <div class="bg-white rounded-xl  p-6">
          <h3 class="font-semibold text-gray-900 mb-4">Options JavaScript</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b">
                  <th class="text-left py-2 font-medium">Option</th>
                  <th class="text-left py-2 font-medium">Type</th>
                  <th class="text-left py-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody class="text-gray-600">
                <tr class="border-b">
                  <td class="py-2"><code>amount</code></td>
                  <td class="py-2">number</td>
                  <td class="py-2">Montant (requis)</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2"><code>currency</code></td>
                  <td class="py-2">string</td>
                  <td class="py-2">"XOF", "EUR" ou "USD"</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2"><code>description</code></td>
                  <td class="py-2">string</td>
                  <td class="py-2">Description affichée</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2"><code>customerEmail</code></td>
                  <td class="py-2">string</td>
                  <td class="py-2">Email pré-rempli</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2"><code>customerName</code></td>
                  <td class="py-2">string</td>
                  <td class="py-2">Nom pré-rempli</td>
                </tr>
                <tr class="border-b">
                  <td class="py-2"><code>onSuccess</code></td>
                  <td class="py-2">function</td>
                  <td class="py-2">Callback appelé avec les détails : <code>(transaction) => {}</code></td>
                </tr>
                <tr class="border-b">
                  <td class="py-2"><code>onCancel</code></td>
                  <td class="py-2">function</td>
                  <td class="py-2">Appelé si annulation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="bg-white rounded-xl  p-6 mb-6">
          <h3 class="font-semibold text-gray-900 mb-4">Callback onSuccess</h3>
          
          <p class="text-gray-600 mb-4">Le callback <code class="bg-gray-100 px-2 py-1 rounded">onSuccess</code> reçoit automatiquement les détails de la transaction :</p>
          
          <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre class="text-sm text-white"><code>LeekPay.checkout({
  amount: 5000,
  currency: 'XOF',
  apiKey: 'pk_live_xxx',
  onSuccess: function(transaction) {
    console.log('Paiement réussi !', transaction)
    
    // Données disponibles :
    // transaction.id
    // transaction.reference
    // transaction.amount
    // transaction.status
    
    // Exemples d'actions :
    alert('Merci ! Votre paiement de ' + transaction.amount + ' CFA a été validé')
    // Débloquer du contenu premium
    // Activer un service
    // Envoyer à votre backend pour validation
  }
})</code></pre>
          </div>
        </div>
      </section>

      <!-- API REST -->
      <section id="api" class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span class="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm">4</span>
          API REST
          <span class="text-sm font-normal text-gray-500 ml-2">Backend-to-Backend</span>
        </h2>

        <div class="bg-white rounded-xl  p-6 mb-6">
          <h3 class="font-semibold text-gray-900 mb-4">Créer un checkout</h3>
          
          <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
            <pre class="text-sm"><code class="text-gray-400"># Requête</code>
<code class="text-white">curl -X POST https://leekpay.me/api/v1/checkout \
  -H "Authorization: Bearer </code><code class="text-yellow-400">sk_live_votre_cle_secrete</code><code class="text-white">" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 5000,
    "currency": "XOF",
    "description": "Commande #123",
    "return_url": "https://votresite.com/success",
    "customer_email": "client@example.com"
  }'</code></pre>
          </div>

          <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre class="text-sm"><code class="text-gray-400"># Réponse</code>
<code class="text-white">{
  "success": true,
  "data": {
    "id": "checkout_123",
    "payment_url": "https://leekpay.me/pay_abc123",
    "amount": 5000,
    "currency": "XOF",
    "status": "pending",
    "expires_at": "2024-12-19T20:00:00Z"
  }
}</code></pre>
          </div>
        </div>

        <div class="bg-white rounded-xl  p-6 mb-6">
          <h3 class="font-semibold text-gray-900 mb-4">Vérifier le statut</h3>
          
          <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre class="text-sm"><code class="text-white">curl https://leekpay.me/api/v1/checkout/checkout_123 \
  -H "Authorization: Bearer sk_live_votre_cle_secrete"</code>

<code class="text-gray-400"># Réponse</code>
<code class="text-white">{
  "success": true,
  "data": {
    "id": "checkout_123",
    "status": "paid",  </code><code class="text-green-400">// pending, paid, failed</code><code class="text-white">
    "paid_at": "2024-12-18T20:15:00Z",
    "transaction_id": "tx_456789"
  }
}</code></pre>
          </div>
        </div>

        <div class="bg-white rounded-xl  p-6">
          <h3 class="font-semibold text-gray-900 mb-4">Exemple PHP</h3>
          
          <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre class="text-sm text-white"><code>&lt;?php
// Créer un checkout
$response = Http::withHeaders([
    'Authorization' => 'Bearer sk_live_votre_cle_secrete'
])->post('https://leekpay.me/api/v1/checkout', [
    'amount' => 5000,
    'currency' => 'XOF',
    'return_url' => 'https://votresite.com/success'
]);

$data = $response->json();

// Rediriger le client vers la page de paiement
return redirect($data['data']['payment_url']);</code></pre>
          </div>
        </div>
      </section>

      <!-- Webhooks -->
      <section id="webhooks" class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span class="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm">5</span>
          Webhooks
          <span class="text-sm font-normal text-gray-500 ml-2">Recommandé</span>
        </h2>

        <div class="bg-white rounded-xl  p-6 mb-6">
          <p class="text-gray-600 mb-4">
            <strong>Recommandé :</strong> Configurez une URL webhook pour recevoir des notifications serveur à serveur quand un paiement est effectué. 
            Plus fiable que les callbacks JavaScript.
          </p>
          
          <p class="text-sm text-gray-500 mb-4">
            Configurez votre URL dans <strong>Dashboard → Clés API → Webhook URL</strong>
          </p>
          
          <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
            <pre class="text-sm"><code class="text-gray-400"># LeekPay envoie automatiquement :</code>
<code class="text-white">POST https://votresite.com/webhook/leekpay
Headers:
  Content-Type: application/json
  X-LeekPay-Signature: abc123...

{
  "event": "payment.success",
  "created_at": "2025-12-18T22:30:00Z",
  "transaction": {
    "id": 123,
    "reference": "LEEKPAY_ABC123_1734567890",
    "amount": 5000,
    "currency": "XOF",
    "status": "paid",
    "payment_method": "mobile_money",
    "customer_email": "client@example.com",
    "customer_name": "Jean Dupont",
    "payment_link": {
      "id": 45,
      "title": "Achat produit",
      "custom_url": "pay_abc123"
    },
    "processed_at": "2025-12-18T22:29:45Z"
  }
}</code></pre>
          </div>

          <div class="bg-white rounded-xl border p-4 mb-4">
            <h4 class="font-semibold text-gray-900 mb-2">Vérifier la signature (recommandé)</h4>
            <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre class="text-sm text-white"><code>&lt;?php
// Votre endpoint de webhook
$signature = $_SERVER['HTTP_X_LEEKPAY_SIGNATURE'];
$payload = file_get_contents('php://input');
$secret = 'pk_live_votre_cle_publique'; // Utilisez votre clé publique

// Vérifier la signature HMAC
$expected = hash_hmac('sha256', $payload, $secret);

if (hash_equals($expected, $signature)) {
    // ✅ Webhook authentique
    $data = json_decode($payload, true);
    
    if ($data['event'] === 'payment.success') {
        $transactionId = $data['transaction']['id'];
        $amount = $data['transaction']['amount'];
        $email = $data['transaction']['customer_email'];
        
        // Débloquer le service, envoyer le produit, etc.
        activateService($email);
    }
    
    http_response_code(200);
    echo json_encode(['received' => true]);
} else {
    // ❌ Signature invalide
    http_response_code(401);
}
?&gt;</code></pre>
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p class="text-blue-800 text-sm">
              <strong>Avantages :</strong> Contrairement aux callbacks JavaScript, les webhooks fonctionnent même si l'utilisateur ferme sa page. 
              Parfait pour débloquer automatiquement un service ou envoyer un produit numérique.
            </p>
          </div>
        </div>
      </section>

      <!-- Devises supportées -->
      <section id="devises" class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Devises supportées</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white rounded-xl  p-6 text-center">
            <p class="text-3xl font-bold text-gray-900">XOF</p>
            <p class="text-gray-500">Franc CFA</p>
            <p class="text-sm text-gray-400 mt-2">Min: 100 CFA</p>
          </div>
          <div class="bg-white rounded-xl  p-6 text-center">
            <p class="text-3xl font-bold text-gray-900">EUR</p>
            <p class="text-gray-500">Euro</p>
            <p class="text-sm text-gray-400 mt-2">Min: 1 €</p>
          </div>
          <div class="bg-white rounded-xl  p-6 text-center">
            <p class="text-3xl font-bold text-gray-900">USD</p>
            <p class="text-gray-500">Dollar US</p>
            <p class="text-sm text-gray-400 mt-2">Min: 1 $</p>
          </div>
        </div>
      </section>

      <!-- Besoin d'aide -->
      <section class="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <h2 class="text-xl font-bold text-gray-900 mb-2">Besoin d'aide ?</h2>
        <p class="text-gray-600 mb-4">Notre équipe est disponible pour vous accompagner</p>
        <a 
          href="mailto:support@leekpay.me" 
          class="inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Contacter le support
        </a>
      </section>

    </div>

    <!-- Footer -->
    <footer class="bg-white border-t mt-16 py-8">
      <div class="max-w-4xl mx-auto px-4 text-center text-gray-500 text-sm">
        <p>© 2024 LeekPay. Tous droits réservés.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Documentation API - LeekPay',
  meta: [
    { name: 'description', content: 'Intégrez LeekPay sur votre site en quelques minutes. Widget HTML, JavaScript ou API REST.' }
  ]
})
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
