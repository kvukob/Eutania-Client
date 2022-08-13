// @ts-check
import { defineStore } from "pinia";

type Inventory = {
  resources: [];
  items: [];
  sectors: [];
};

type InventoryItem = {
  equipped: boolean;
  quantity: number;
  item: Item;
};

type Item = {
  name: string;
  type: string;
};

export const useInventoryStore = defineStore({
  id: "inventory",

  state: () => ({
    resources: new Array<InventoryItem>(),
    items: new Array<InventoryItem>(),
    sectors: [],
  }),

  getters: {
    getResources(state) {
      return state.resources;
    },
    getItems(state) {
      return state.items;
    },
    getAllGameItems(state) {
      return state.resources.concat(state.items);
    },
    getResourceQtyByName: (state) => {
      return (name: string) => {
        const item = state.resources.find(
          (resource) => resource["item"]["name"] === name
        );
        if (item) return item["quantity"];
        return 0;
      };
    },
    getItemsByType: (state) => {
      return (type: string) => {
        return state.items.filter((i) => i["item"]["type"] === type);
      };
    },
    getItemQtyByName: (state) => {
      return (name: string) => {
        const item = state.items.find((i) => i["item"]["name"] === name);
        if (item) return item["quantity"];
        return 0;
      };
    },
    getEquippedHarvesterItems: (state) => {
      return state.items.filter(
        (i) => i["equipped"] && i.item.type.includes("Harvester")
      );
    },
    getSectors: (state) => {
      return state.sectors;
    },
    getSectorByName: (state) => {
      return (name: string) => {
        return state.sectors.find((i) => i["name"] === name);
      };
    },
  },

  actions: {
    setInventory(inventory: Inventory) {
      this.resources = inventory.resources;
      this.items = inventory.items;
      this.sectors = inventory.sectors;
    },
  },
});
