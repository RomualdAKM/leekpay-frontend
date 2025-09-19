<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div>
      <h1 class="mb-2 text-2xl font-bold" style="color: #0A1F44">Demandes de Retrait</h1>
      <p class="text-gray-600">Gérez vos retraits et moyens de paiement</p>
    </div>

    <!-- Balance Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card class="p-6 border-l-4" style="border-left-color: #2ECC71">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm">Solde disponible</p>
            <p class="text-2xl font-semibold mt-1" style="color: #0A1F44">
              {{ availableBalance.toLocaleString() }}€
            </p>
          </div>
          <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Wallet class="w-6 h-6" style="color: #2ECC71" />
          </div>
        </div>
      </Card>

      <Card class="p-6 border-l-4" style="border-left-color: #F39C12">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm">En cours de retrait</p>
            <p class="text-2xl font-semibold mt-1" style="color: #0A1F44">
              {{ pendingBalance.toLocaleString() }}€
            </p>
          </div>
          <div class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
            <ArrowUpRight class="w-6 h-6" style="color: #F39C12" />
          </div>
        </div>
      </Card>

      <Card class="p-6 border-l-4" style="border-left-color: #0A1F44">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm">Retrait minimum</p>
            <p class="text-2xl font-semibold mt-1" style="color: #0A1F44">
              {{ minimumWithdrawal }}€
            </p>
          </div>
          <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <AlertCircle class="w-6 h-6" style="color: #0A1F44" />
          </div>
        </div>
      </Card>
    </div>

    <!-- Tabs -->
    <Tabs v-model="activeTab" defaultValue="request" class="w-full">
      <TabsList class="grid w-full grid-cols-3">
        <TabsTrigger
            value="request"
            class="data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:font-bold py-2"
        >
          Nouveau retrait
        </TabsTrigger>
        <TabsTrigger
            value="methods"
            class="data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:font-bold py-2"
        >
          Moyens de paiement
        </TabsTrigger>
        <TabsTrigger
            value="history"
            class="data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:font-bold py-2"
        >
          Historique
        </TabsTrigger>
      </TabsList>

      <!-- Nouvelle Demande -->
      <TabsContent value="request" class="space-y-6">
        <Card class="p-6">
          <h3 class="mb-6 text-lg font-semibold" style="color: #0A1F44">
            Faire une demande de retrait
          </h3>

          <div class="space-y-6">
            <!-- Montant -->
            <div class="space-y-2">
              <Label for="amount">Montant à retirer</Label>
              <div class="relative">
                <Input
                    id="amount"
                    type="number"
                    v-model="withdrawalAmount"
                    :min="minimumWithdrawal"
                    :max="availableBalance"
                    :placeholder="`Minimum ${minimumWithdrawal}€`"
                    class="pr-12"
                />
                <span
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  €
                </span>
              </div>
              <p class="text-sm text-gray-600">
                Maximum disponible: {{ availableBalance.toLocaleString() }}€
              </p>
            </div>

            <!-- Résumé Calcul -->
            <div
                v-if="withdrawalAmount && parseFloat(withdrawalAmount) >= minimumWithdrawal"
                class="bg-gray-50 p-4 rounded-lg"
            >
              <div class="flex justify-between text-sm">
                <span>Montant demandé:</span>
                <span class="font-medium">{{ parseFloat(withdrawalAmount).toLocaleString() }}€</span>
              </div>
              <div class="flex justify-between text-sm mt-2">
                <span>Frais de traitement (1.5%):</span>
                <span class="font-medium text-red-600">
                  -{{ calculateFees(parseFloat(withdrawalAmount)).toFixed(2) }}€
                </span>
              </div>
              <hr class="my-2" />
              <div class="flex justify-between font-semibold">
                <span>Montant à recevoir:</span>
                <span style="color: #2ECC71">
                  {{
                    (parseFloat(withdrawalAmount) -
                        calculateFees(parseFloat(withdrawalAmount))).toFixed(2)
                  }}€
                </span>
              </div>
            </div>

            <!-- Sélection Méthode -->
            <div class="space-y-2">
              <Label>Moyen de retrait</Label>
              <div class="grid grid-cols-1 gap-3">
                <div
                    v-for="method in paymentMethods"
                    :key="method.id"
                    class="p-4 border rounded-lg cursor-pointer transition-colors"
                    :class="
                    selectedMethod === method.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  "
                    @click="selectedMethod = method.id"
                >
                  <div class="flex items-center gap-3">
                    <component :is="method.icon" class="w-5 h-5 text-gray-600" />
                    <div class="flex-1">
                      <p class="font-medium">{{ method.name }}</p>
                      <p class="text-sm text-gray-600">{{ method.details }}</p>
                    </div>
                    <Badge v-if="method.isDefault" class="bg-blue-100 text-blue-700">
                      Par défaut
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <Button
                :disabled="
                !withdrawalAmount ||
                parseFloat(withdrawalAmount) < minimumWithdrawal ||
                parseFloat(withdrawalAmount) > availableBalance
              "
                class="w-full gap-2"
                style="background-color: #2ECC71; color: white"
                @click="handleWithdrawalRequest"
            >
              <Wallet class="w-4 h-4" />
              Demander le retrait
            </Button>
          </div>
        </Card>
      </TabsContent>

      <!-- Moyens de paiement -->
      <TabsContent value="methods" class="space-y-6">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold" style="color: #0A1F44">
            Moyens de paiement configurés
          </h3>
          <Button variant="outline" class="gap-2" @click="showAddMethod = !showAddMethod">
            <Plus class="w-4 h-4" />
            Ajouter un moyen
          </Button>
        </div>

        <Card v-if="showAddMethod" class="p-6 border-dashed border-2 border-gray-300">
          <h4 class="mb-4">Ajouter un nouveau moyen de retrait</h4>
          <div class="grid grid-cols-2 gap-4">
            <Button variant="outline" class="p-6 h-auto flex flex-col gap-2">
              <CreditCard class="w-8 h-8" />
              Carte bancaire
            </Button>
            <Button variant="outline" class="p-6 h-auto flex flex-col gap-2">
              <Smartphone class="w-8 h-8" />
              Mobile Money
            </Button>
          </div>
        </Card>

        <div class="space-y-4">
          <Card
              v-for="method in paymentMethods"
              :key="method.id"
              class="p-6"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <component :is="method.icon" class="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h4 class="font-semibold" style="color: #0A1F44">{{ method.name }}</h4>
                  <p class="text-sm text-gray-600">{{ method.details }}</p>
                  <Badge v-if="method.isDefault" class="bg-blue-100 text-blue-700 mt-2">
                    Méthode par défaut
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" class="gap-2">
                <Settings class="w-4 h-4" /> Modifier
              </Button>
            </div>
          </Card>
        </div>
      </TabsContent>

      <!-- Historique -->
      <TabsContent value="history">
        <Card>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
              <tr class="border-b">
                <th class="text-left p-4 font-medium" style="color: #0A1F44">Demande</th>
                <th class="text-left p-4 font-medium" style="color: #0A1F44">Montant</th>
                <th class="text-left p-4 font-medium" style="color: #0A1F44">Frais</th>
                <th class="text-left p-4 font-medium" style="color: #0A1F44">Moyen</th>
                <th class="text-left p-4 font-medium" style="color: #0A1F44">Date</th>
                <th class="text-left p-4 font-medium" style="color: #0A1F44">Statut</th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="withdrawal in mockWithdrawals"
                  :key="withdrawal.id"
                  class="border-b hover:bg-gray-50"
              >
                <td class="p-4">
                  <p class="font-medium" style="color: #0A1F44">{{ withdrawal.id }}</p>
                  <p v-if="withdrawal.rejectionReason" class="text-sm text-red-600 mt-1">
                    {{ withdrawal.rejectionReason }}
                  </p>
                </td>
                <td class="p-4 font-semibold" style="color: #0A1F44">
                  {{ withdrawal.amount.toLocaleString() }}€
                </td>
                <td class="p-4 text-red-600">-{{ withdrawal.fees }}€</td>
                <td class="p-4">
                  <p class="font-medium text-sm">{{ withdrawal.method }}</p>
                  <p class="text-xs text-gray-500">{{ withdrawal.methodDetails }}</p>
                </td>
                <td class="p-4 flex items-center gap-1 text-sm text-gray-500">
                  <Calendar class="w-4 h-4" />
                  {{ formatDate(withdrawal.date) }}
                </td>
                <td class="p-4">
                  <component :is="getStatusBadge(withdrawal.status)" />
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})
import { ref, h } from "vue";
import Card from "~/components/ui/Card.vue";
import Button from "~/components/ui/Button.vue";
import Input from "~/components/ui/Input.vue";
import Label from "~/components/ui/Label.vue";
import Badge from "~/components/ui/Badge.vue";
import Tabs from "~/components/ui/Tabs.vue";
import TabsList from "~/components/ui/TabsList.vue";
import TabsTrigger from "~/components/ui/TabsTrigger.vue";
import TabsContent from "~/components/ui/TabsContent.vue";
import {
  Wallet,
  CreditCard,
  Smartphone,
  Plus,
  ArrowUpRight,
  Calendar,
  Settings,
  AlertCircle
} from "lucide-vue-next";

const mockWithdrawals = [
  { id: "WD-2024-001", amount: 1500, method: "Carte bancaire", methodDetails: "**** **** **** 1234", date: "2024-01-10T14:30:00Z", status: "completed", fees: 15 },
  { id: "WD-2024-002", amount: 800, method: "Orange Money", methodDetails: "+225 07 XX XX XX 45", date: "2024-01-05T10:15:00Z", status: "pending", fees: 8 },
  { id: "WD-2024-003", amount: 2000, method: "Carte bancaire", methodDetails: "**** **** **** 1234", date: "2023-12-28T16:45:00Z", status: "rejected", fees: 20, rejectionReason: "Informations bancaires invalides" }
];

const paymentMethods = [
  { id: 1, type: "card", name: "Carte bancaire", details: "**** **** **** 1234", icon: CreditCard, isDefault: true },
  { id: 2, type: "mobile", name: "Orange Money", details: "+225 07 XX XX XX 45", icon: Smartphone, isDefault: false }
];

const availableBalance = 5420;
const pendingBalance = 800;
const minimumWithdrawal = 50;
const fees = 0.015;

const activeTab = ref("request");
const withdrawalAmount = ref("");
const selectedMethod = ref(paymentMethods[0].id);
const showAddMethod = ref(false);

const calculateFees = (amount) => Math.max(amount * fees, 2);

const handleWithdrawalRequest = () => {
  const amount = parseFloat(withdrawalAmount.value);
  if (amount >= minimumWithdrawal && amount <= availableBalance) {
    alert(`Demande de retrait de ${amount}€ enregistrée avec succès !`);
    withdrawalAmount.value = "";
  }
};

const getStatusBadge = (status) => {
  switch (status) {
    case "completed":
      return h("span", { class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700" }, "Traité");
    case "pending":
      return h("span", { class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700" }, "En attente");
    case "rejected":
      return h("span", { class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700" }, "Refusé");
    default:
      return h("span", { class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700" }, "Inconnu");
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};
</script>
