<template>
  <div class="min-h-screen bg-white">
    <!-- Titre de la page -->
    <div class="border-b border-gray-200 bg-gray-50">
      <div class="max-w-6xl mx-auto px-6 py-6">
        <h1 class="text-2xl font-semibold text-gray-900">Documentation</h1>
        <p class="text-sm text-gray-500 mt-1">Intégrez LeekPay sur votre site</p>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-6 flex">
      <!-- Sidebar -->
      <aside class="w-56 flex-shrink-0 py-10 pr-8 hidden lg:block">
        <nav class="sticky top-10 space-y-1">
          <a href="#demarrage" class="block py-1.5 text-sm text-gray-600 hover:text-gray-900">Démarrage</a>
          <a href="#widget" class="block py-1.5 text-sm text-gray-600 hover:text-gray-900">Widget HTML</a>
          <a href="#javascript" class="block py-1.5 text-sm text-gray-600 hover:text-gray-900">JavaScript</a>
          <a href="#api" class="block py-1.5 text-sm text-gray-600 hover:text-gray-900">API REST</a>
          <a href="#webhooks" class="block py-1.5 text-sm text-gray-600 hover:text-gray-900">Webhooks</a>
          <a href="#devises" class="block py-1.5 text-sm text-gray-600 hover:text-gray-900">Devises</a>
          <a href="#statuts" class="block py-1.5 text-sm text-gray-600 hover:text-gray-900">Statuts</a>
        </nav>
      </aside>

      <!-- Contenu -->
      <main class="flex-1 py-10 lg:pl-8 lg:border-l border-gray-100">
        
        <!-- Démarrage -->
        <section id="demarrage" class="mb-16">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Démarrage</h2>
          
          <div class="mb-8">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Obtenez vos clés API</h3>
            <ol class="text-sm text-gray-600 space-y-2 list-decimal list-inside">
              <li>Créez un compte sur <a href="/register" class="text-gray-900 underline">leekpay.me</a></li>
              <li>Allez dans Dashboard → Clés API</li>
              <li>Cliquez sur Nouvelle clé API</li>
              <li>Copiez votre <code class="bg-gray-100 px-1.5 py-0.5 rounded text-xs">pk_live_xxx</code> (publique) et <code class="bg-gray-100 px-1.5 py-0.5 rounded text-xs">sk_live_xxx</code> (secrète)</li>
            </ol>
          </div>

          <div class="mb-8">
            <h3 class="text-sm font-medium text-gray-900 mb-4">Trois méthodes d'intégration</h3>
            <div class="border border-gray-200 rounded-lg divide-y divide-gray-200">
              <a href="#widget" class="block p-4 hover:bg-gray-50">
                <div class="flex items-start gap-4">
                  <span class="text-sm font-medium text-gray-400">1</span>
                  <div>
                    <span class="text-sm font-medium text-gray-900">Widget HTML</span>
                    <p class="text-sm text-gray-500 mt-0.5">Intégration en quelques lignes HTML. Idéal pour débuter.</p>
                  </div>
                </div>
              </a>
              <a href="#javascript" class="block p-4 hover:bg-gray-50">
                <div class="flex items-start gap-4">
                  <span class="text-sm font-medium text-gray-400">2</span>
                  <div>
                    <span class="text-sm font-medium text-gray-900">JavaScript</span>
                    <p class="text-sm text-gray-500 mt-0.5">Contrôle programmatique du paiement avec callbacks.</p>
                  </div>
                </div>
              </a>
              <a href="#api" class="block p-4 hover:bg-gray-50">
                <div class="flex items-start gap-4">
                  <span class="text-sm font-medium text-gray-400">3</span>
                  <div>
                    <span class="text-sm font-medium text-gray-900">API REST</span>
                    <p class="text-sm text-gray-500 mt-0.5">Intégration backend pour un contrôle total.</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div class="bg-amber-50 border-l-2 border-amber-400 pl-4 py-3">
            <p class="text-sm text-amber-800">
              Ne partagez jamais votre clé secrète. Utilisez-la uniquement côté serveur.
            </p>
          </div>
        </section>

        <!-- Widget HTML -->
        <section id="widget" class="mb-16">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Widget HTML</h2>

          <p class="text-sm text-gray-600 mb-6">
            Intégrez un bouton de paiement sur votre site en quelques lignes de code HTML. 
            Aucune configuration serveur nécessaire.
          </p>

          <div class="mb-8">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Étape 1 : Ajouter le script et le bouton</h3>
            <div class="bg-gray-900 rounded p-4 overflow-x-auto">
              <pre class="text-sm font-mono"><code class="text-gray-300">&lt;!-- Charger le script LeekPay --&gt;
&lt;script src="https://leekpay.fr/js/leekpay.js"&gt;&lt;/script&gt;

&lt;!-- Bouton de paiement --&gt;
&lt;button 
  data-leekpay-amount="5000" 
  data-leekpay-currency="XOF"
  data-leekpay-key="pk_live_votre_cle_publique"
  data-leekpay-description="Commande #123"&gt;
  Payer 5 000 CFA
&lt;/button&gt;</code></pre>
            </div>
          </div>

          <div class="mb-8">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Étape 2 : Gérer le résultat (optionnel)</h3>
            <p class="text-xs text-gray-500 mb-3">Ajoutez des callbacks pour réagir après le paiement :</p>
            <div class="bg-gray-900 rounded p-4 overflow-x-auto">
              <pre class="text-sm font-mono"><code class="text-gray-300">&lt;script&gt;
LeekPay.configure({
  onSuccess: function(data) {
    console.log('Paiement réussi !');
    console.log('Montant:', data.amount, data.currency);
    window.location.href = '/merci';
  },
  onCancel: function() {
    console.log('Paiement annulé');
  }
});
&lt;/script&gt;</code></pre>
            </div>
          </div>

          <div class="border border-gray-200 rounded">
            <table class="w-full text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th class="text-left px-4 py-2 font-medium text-gray-700">Attribut</th>
                  <th class="text-left px-4 py-2 font-medium text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">data-leekpay-key</code></td>
                  <td class="px-4 py-2 text-gray-600">Votre clé publique pk_live_xxx (requis)</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">data-leekpay-amount</code></td>
                  <td class="px-4 py-2 text-gray-600">Montant à payer (requis)</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">data-leekpay-currency</code></td>
                  <td class="px-4 py-2 text-gray-600">Devise : XOF, EUR, USD (requis)</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">data-leekpay-description</code></td>
                  <td class="px-4 py-2 text-gray-600">Description affichée au client</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">data-leekpay-email</code></td>
                  <td class="px-4 py-2 text-gray-600">Email pré-rempli du client</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- JavaScript -->
        <section id="javascript" class="mb-16">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">JavaScript</h2>

          <div class="mb-6">
            <p class="text-sm text-gray-600 mb-4">Lancez le paiement depuis votre code JavaScript :</p>
            
            <div class="bg-gray-900 rounded p-4 overflow-x-auto">
              <pre class="text-sm font-mono"><code class="text-gray-300">&lt;!-- 1. Charger le script --&gt;
&lt;script src="https://leekpay.fr/js/leekpay.js"&gt;&lt;/script&gt;

&lt;!-- 2. Bouton de paiement --&gt;
&lt;button onclick="payer()"&gt;Payer maintenant&lt;/button&gt;

&lt;script&gt;
function payer() {
  LeekPay.checkout({
    amount: 5000,
    currency: 'XOF',
    apiKey: 'pk_live_votre_cle_publique',
    description: 'Commande #123',
    
    onSuccess: function(data) {
      console.log('Paiement réussi:', data.amount, data.currency);
      window.location.href = '/merci';
    },
    onCancel: function() {
      console.log('Paiement annulé');
    }
  });
}
&lt;/script&gt;</code></pre>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Données reçues dans onSuccess</h3>
            <div class="bg-gray-100 rounded p-3 text-sm text-gray-700">
              <code>data.status</code> • <code>data.amount</code> • <code>data.currency</code> • <code>data.payment_id</code>
            </div>
          </div>

          <div class="border border-gray-200 rounded">
            <table class="w-full text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th class="text-left px-4 py-2 font-medium text-gray-700">Option</th>
                  <th class="text-left px-4 py-2 font-medium text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">amount</code></td>
                  <td class="px-4 py-2 text-gray-600">Montant à payer (requis)</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">currency</code></td>
                  <td class="px-4 py-2 text-gray-600">Devise : XOF, EUR, USD (requis)</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">apiKey</code></td>
                  <td class="px-4 py-2 text-gray-600">Votre clé publique pk_live_xxx (requis)</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">description</code></td>
                  <td class="px-4 py-2 text-gray-600">Description affichée au client</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">customerEmail</code></td>
                  <td class="px-4 py-2 text-gray-600">Email pré-rempli du client</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">onSuccess</code></td>
                  <td class="px-4 py-2 text-gray-600">Fonction appelée après paiement réussi</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">onCancel</code></td>
                  <td class="px-4 py-2 text-gray-600">Fonction appelée si annulation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- API REST -->
        <section id="api" class="mb-16">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">API REST</h2>

          <p class="text-sm text-gray-600 mb-6">
            Utilisez l'API REST pour créer des paiements depuis votre serveur. 
            Authentifiez-vous avec votre <strong>clé secrète</strong> (sk_live_xxx).
          </p>

          <div class="mb-8">
            <h3 class="text-sm font-medium text-gray-900 mb-2">Créer un checkout</h3>
            <p class="text-xs text-gray-500 mb-3">
              <code class="bg-gray-100 px-1.5 py-0.5 rounded">POST /api/v1/checkout</code>
              <span class="ml-2">Authentification : Bearer Token (clé secrète)</span>
            </p>
            
            <div class="bg-gray-900 rounded p-4 overflow-x-auto mb-4">
              <pre class="text-sm font-mono"><code class="text-gray-300"># Requête
curl -X POST https://leekpay.fr/api/v1/checkout \
  -H "Authorization: Bearer sk_live_votre_cle_secrete" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 5000,
    "currency": "XOF",
    "description": "Commande #123",
    "return_url": "https://votresite.com/merci",
    "customer_email": "client@example.com"
  }'</code></pre>
            </div>

            <div class="bg-gray-900 rounded p-4 overflow-x-auto">
              <pre class="text-sm font-mono"><code class="text-gray-300"># Réponse
{
  "success": true,
  "data": {
    "payment_url": "https://leekpay.fr/pay/abc123",
    "payment_id": "abc123",
    "status": "pending",
    "amount": 5000,
    "currency": "XOF"
  }
}</code></pre>
            </div>
          </div>

          <div class="mb-8">
            <h3 class="text-sm font-medium text-gray-900 mb-2">Vérifier le statut</h3>
            <p class="text-xs text-gray-500 mb-3">
              <code class="bg-gray-100 px-1.5 py-0.5 rounded">GET /api/v1/checkout/{payment_id}</code>
            </p>
            
            <div class="bg-gray-900 rounded p-4 overflow-x-auto">
              <pre class="text-sm font-mono"><code class="text-gray-300">curl https://leekpay.fr/api/v1/checkout/abc123 \
  -H "Authorization: Bearer sk_live_votre_cle_secrete"</code></pre>
            </div>
          </div>

          <div class="border border-gray-200 rounded">
            <table class="w-full text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th class="text-left px-4 py-2 font-medium text-gray-700">Paramètre</th>
                  <th class="text-left px-4 py-2 font-medium text-gray-700">Type</th>
                  <th class="text-left px-4 py-2 font-medium text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">amount</code></td>
                  <td class="px-4 py-2 text-gray-500">integer</td>
                  <td class="px-4 py-2 text-gray-600">Montant en centimes (requis)</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">currency</code></td>
                  <td class="px-4 py-2 text-gray-500">string</td>
                  <td class="px-4 py-2 text-gray-600">XOF, EUR ou USD (requis)</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">description</code></td>
                  <td class="px-4 py-2 text-gray-500">string</td>
                  <td class="px-4 py-2 text-gray-600">Description de la commande</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">return_url</code></td>
                  <td class="px-4 py-2 text-gray-500">string</td>
                  <td class="px-4 py-2 text-gray-600">URL de redirection après paiement</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">customer_email</code></td>
                  <td class="px-4 py-2 text-gray-500">string</td>
                  <td class="px-4 py-2 text-gray-600">Email du client</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-6">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Champs de la réponse</h3>
            <div class="border border-gray-200 rounded">
              <table class="w-full text-sm">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="text-left px-4 py-2 font-medium text-gray-700">Champ</th>
                    <th class="text-left px-4 py-2 font-medium text-gray-700">Type</th>
                    <th class="text-left px-4 py-2 font-medium text-gray-700">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr>
                    <td class="px-4 py-2"><code class="text-xs">payment_url</code></td>
                    <td class="px-4 py-2 text-gray-500">string</td>
                    <td class="px-4 py-2 text-gray-600">URL de la page de paiement</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-2"><code class="text-xs">payment_id</code></td>
                    <td class="px-4 py-2 text-gray-500">string</td>
                    <td class="px-4 py-2 text-gray-600">Identifiant unique du paiement</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-2"><code class="text-xs">status</code></td>
                    <td class="px-4 py-2 text-gray-500">string</td>
                    <td class="px-4 py-2 text-gray-600">Statut du paiement (voir <a href="#statuts" class="text-gray-900 underline">Statuts</a>)</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-2"><code class="text-xs">amount</code></td>
                    <td class="px-4 py-2 text-gray-500">integer</td>
                    <td class="px-4 py-2 text-gray-600">Montant du paiement</td>
                  </tr>
                  <tr>
                    <td class="px-4 py-2"><code class="text-xs">currency</code></td>
                    <td class="px-4 py-2 text-gray-500">string</td>
                    <td class="px-4 py-2 text-gray-600">Devise du paiement</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- Webhooks -->
        <section id="webhooks" class="mb-16">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Webhooks</h2>

          <p class="text-sm text-gray-600 mb-6">
            Recevez une notification sur votre serveur quand un paiement est effectué. 
            Configurez l'URL de votre endpoint dans <strong>Dashboard → Clés API</strong>.
          </p>

          <div class="mb-8">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Format de la notification</h3>
            <p class="text-xs text-gray-500 mb-3">LeekPay envoie une requête POST à votre URL avec les données du paiement :</p>
            <div class="bg-gray-900 rounded p-4 overflow-x-auto">
              <pre class="text-sm font-mono"><code class="text-gray-300"># Requête envoyée par LeekPay à votre serveur

POST https://votresite.com/webhook
Content-Type: application/json
X-LeekPay-Signature: 5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a...

{
  "event": "payment.success",
  "transaction": {
    "id": 123,
    "amount": 5000,
    "currency": "XOF",
    "status": "completed",
    "customer_email": "client@example.com",
    "description": "Commande #123",
    "created_at": "2024-01-15T10:30:00Z"
  }
}</code></pre>
            </div>
          </div>

          <div class="mb-8">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Vérifier la signature (sécurité)</h3>
            <p class="text-xs text-gray-500 mb-3">
              La signature <code class="bg-gray-100 px-1 rounded">X-LeekPay-Signature</code> est envoyée dans les headers HTTP. 
              Utilisez votre <strong>clé publique</strong> pour la vérifier.
            </p>
            <div class="bg-gray-900 rounded p-4 overflow-x-auto">
              <pre class="text-sm font-mono"><code class="text-gray-300">&lt;?php
// Exemple PHP : vérification de la signature webhook

// 1. Récupérer la signature envoyée par LeekPay
$signature = $_SERVER['HTTP_X_LEEKPAY_SIGNATURE'];

// 2. Récupérer le corps de la requête (payload JSON)
$payload = file_get_contents('php://input');

// 3. Calculer la signature attendue avec votre clé publique
$expected = hash_hmac('sha256', $payload, 'pk_live_votre_cle_publique');

// 4. Comparer les signatures de manière sécurisée
if (hash_equals($expected, $signature)) {
    // Signature valide : traiter le paiement
    $data = json_decode($payload, true);
    $transactionId = $data['transaction']['id'];
    $amount = $data['transaction']['amount'];
    
    // Mettre à jour votre base de données...
    
    http_response_code(200);
    echo 'OK';
} else {
    // Signature invalide : rejeter la requête
    http_response_code(401);
    echo 'Invalid signature';
}</code></pre>
            </div>
          </div>

          <div class="border border-gray-200 rounded">
            <table class="w-full text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th class="text-left px-4 py-2 font-medium text-gray-700">Champ</th>
                  <th class="text-left px-4 py-2 font-medium text-gray-700">Type</th>
                  <th class="text-left px-4 py-2 font-medium text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">event</code></td>
                  <td class="px-4 py-2 text-gray-500">string</td>
                  <td class="px-4 py-2 text-gray-600">Type d'événement ("payment.success")</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">transaction.id</code></td>
                  <td class="px-4 py-2 text-gray-500">integer</td>
                  <td class="px-4 py-2 text-gray-600">ID unique de la transaction</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">transaction.amount</code></td>
                  <td class="px-4 py-2 text-gray-500">integer</td>
                  <td class="px-4 py-2 text-gray-600">Montant payé</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">transaction.currency</code></td>
                  <td class="px-4 py-2 text-gray-500">string</td>
                  <td class="px-4 py-2 text-gray-600">Devise (XOF, EUR, USD)</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">transaction.status</code></td>
                  <td class="px-4 py-2 text-gray-500">string</td>
                  <td class="px-4 py-2 text-gray-600">Statut du paiement</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">transaction.customer_email</code></td>
                  <td class="px-4 py-2 text-gray-500">string</td>
                  <td class="px-4 py-2 text-gray-600">Email du client</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Devises -->
        <section id="devises" class="mb-16">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Devises</h2>
          
          <div class="border border-gray-200 rounded">
            <table class="w-full text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th class="text-left px-4 py-2 font-medium text-gray-700">Devise</th>
                  <th class="text-left px-4 py-2 font-medium text-gray-700">Minimum</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr>
                  <td class="px-4 py-2">XOF (Franc CFA)</td>
                  <td class="px-4 py-2 text-gray-600">100 CFA</td>
                </tr>
                <tr>
                  <td class="px-4 py-2">EUR (Euro)</td>
                  <td class="px-4 py-2 text-gray-600">1 €</td>
                </tr>
                <tr>
                  <td class="px-4 py-2">USD (Dollar)</td>
                  <td class="px-4 py-2 text-gray-600">1 $</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Statuts -->
        <section id="statuts" class="mb-16">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Statuts de paiement</h2>
          
          <p class="text-sm text-gray-600 mb-6">
            Les transactions passent par différents statuts au cours de leur cycle de vie.
          </p>

          <div class="border border-gray-200 rounded">
            <table class="w-full text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th class="text-left px-4 py-2 font-medium text-gray-700">Statut</th>
                  <th class="text-left px-4 py-2 font-medium text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">pending</code></td>
                  <td class="px-4 py-2 text-gray-600">Paiement en attente, le client n'a pas encore payé</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">processing</code></td>
                  <td class="px-4 py-2 text-gray-600">Paiement en cours de traitement par le prestataire</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">completed</code></td>
                  <td class="px-4 py-2 text-gray-600">Paiement réussi et validé</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">failed</code></td>
                  <td class="px-4 py-2 text-gray-600">Paiement échoué (fonds insuffisants, erreur technique)</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">cancelled</code></td>
                  <td class="px-4 py-2 text-gray-600">Paiement annulé par le client</td>
                </tr>
                <tr>
                  <td class="px-4 py-2"><code class="text-xs">expired</code></td>
                  <td class="px-4 py-2 text-gray-600">Lien de paiement expiré (délai dépassé)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Support -->
        <section class="border-t border-gray-200 pt-8">
          <p class="text-sm text-gray-600">
            Besoin d'aide ? Contactez <a href="mailto:support@leekpay.fr" class="text-gray-900 underline">support@leekpay.fr</a>
          </p>
        </section>

      </main>
    </div>

    <!-- Footer -->
    <footer class="border-t border-gray-200 py-6">
      <div class="max-w-6xl mx-auto px-6 text-center text-gray-400 text-xs">
        <p>© 2025 LeekPay</p>
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
