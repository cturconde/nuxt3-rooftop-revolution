import type { Client, Supply } from "@/types/index";
import clientsData from "@/dataMock/clients.json";
import supplyPointsData from "@/dataMock/supply-points.json";

const apiClient = {
  async getClient(cups: string): Promise<Client | undefined> {
    return clientsData.find((client: Client) => client.cups === cups);
  },
  async getSupply(cups: string): Promise<Supply | undefined> {
    return supplyPointsData.find((supply: Supply) => supply.cups === cups);
  },
};

export default apiClient;
