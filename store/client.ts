import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/services/api";
import type { Client, Supply } from "@/types/index";

export const useClientStore = defineStore("client", () => {
  const client = ref<Client | null>(null);
  const supply = ref<Supply | null>(null);
  const error = ref<string | null>(null);

  const fetchClientData = async (cups: string) => {
    try {
      const clientData = await api.getClient(cups);
      const supplyData = await api.getSupply(cups);
      if (clientData && supplyData) {
        client.value = clientData;
        supply.value = supplyData;
        error.value = null;
      } else {
        error.value = "Client or supply point not found";
        client.value = null;
        supply.value = null;
      }
    } catch (err) {
      error.value = "Error fetching data";
      client.value = null;
      supply.value = null;
    }
  };

  return {
    client,
    supply,
    error,
    fetchClientData,
  };
});
