<template>
  <div class="row m-3">
    <div class="col-md-6 col-12">
      <div>
        <h2>Client & Supply Information</h2>
        <table class="table">
          <tbody>
            <tr>
              <th scope="row">Name</th>
              <td>{{ clientStore.client?.full_name || "none" }}</td>
            </tr>
            <tr>
              <th scope="row">Building Type</th>
              <td>{{ clientStore.client?.building_type || "none" }}</td>
            </tr>
            <tr>
              <th scope="row">CUPS</th>
              <td>{{ clientStore.supply?.cups || "none" }}</td>
            </tr>
            <tr>
              <th scope="row">Tariff</th>
              <td>{{ clientStore.supply?.tariff || "none" }}</td>
            </tr>
          </tbody>
        </table>

        <h2>Rooftop Revolution Eligibility</h2>
        <p v-if="isEligible" class="text-success">
          {{ offer }}
        </p>
        <p v-else class="text-danger">Not eligible</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useClientStore } from "@/store/client";
import { ref, computed } from "vue";
import api from "@/services/api";

const clientStore = useClientStore();

const isEligible = computed(() => {
  return (
    clientStore.client?.building_type === "house" &&
    clientStore.supply?.neighbors.length! > 0
  );
});

const { data: offer, refresh } = await useAsyncData("offer", async () => {
  if (!isEligible.value) return "";
  const supply = clientStore.supply;

  // Check for special discount
  const specialDiscount = await calculateSpecialDiscount(supply?.neighbors);
  if (specialDiscount) return "Special discount (12%)";

  // Check for basic discount
  const basicDiscount = await calculateBasicDiscount(
    supply?.neighbors,
    supply?.power
  );
  if (basicDiscount) return "Basic discount (5%)";

  // Default to standard offer
  return "Standard offer";
});

const calculateSpecialDiscount = async (
  neighbors: string[] | undefined
): Promise<boolean> => {
  if (!neighbors) return false;
  const promises = neighbors.map(async (neighbor: string) => {
    const clientData = await api.getSupply(neighbor);
    const invoicedAmount: string = clientData!.invoiced_amount;
    return parseFloat(invoicedAmount);
  });
  const amounts = await Promise.all(promises);
  const totalInvoiced = amounts.reduce((sum, amount) => sum + amount, 0);
  return totalInvoiced > 100;
};

const calculateBasicDiscount = async (
  neighbors: string[] | undefined,
  currentPower: { p1: string; p2: string } | undefined
): Promise<boolean> => {
  if (!neighbors || !currentPower) return false;
  const promises = neighbors.map(async (neighbor: string) => {
    const clientData = await api.getSupply(neighbor);
    const neighborPower = clientData!.power;
    return (
      neighborPower.p1 < currentPower.p1 && neighborPower.p2 < currentPower.p2
    );
  });
  const results = await Promise.all(promises);
  return results.every((result) => result);
};

watch(
  () => clientStore.supply,
  () => {
    refresh();
  },
  { immediate: true }
);
</script>
