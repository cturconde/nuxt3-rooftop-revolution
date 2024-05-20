// __tests__/services/apiClient.test.ts
import apiClient from "@/services/api";
import clientsData from "@/dataMock/clients.json";
import supplyPointsData from "@/dataMock/supply-points.json";

describe("apiClient", () => {
  describe("getClient", () => {
    it("should return a client for a valid CUPS", async () => {
      const cups = clientsData[0].cups;
      const client = await apiClient.getClient(cups);
      expect(client).toEqual(clientsData[0]);
    });

    it("should return undefined for an invalid CUPS", async () => {
      const invalidCups = "invalid-cups";
      const client = await apiClient.getClient(invalidCups);
      expect(client).toBeUndefined();
    });
  });

  describe("getSupply", () => {
    it("should return a supply for a valid CUPS", async () => {
      const cups = supplyPointsData[0].cups;
      const supply = await apiClient.getSupply(cups);
      expect(supply).toEqual(supplyPointsData[0]);
    });

    it("should return undefined for an invalid CUPS", async () => {
      const invalidCups = "invalid-cups";
      const supply = await apiClient.getSupply(invalidCups);
      expect(supply).toBeUndefined();
    });
  });
});
