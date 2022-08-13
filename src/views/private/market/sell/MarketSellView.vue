<template>
  <v-container fluid>
    <v-card border class="pa-2">
      <v-btn-toggle
        mandatory
        style="min-width: 100%"
        color="primary"
        variant="tonal"
        v-model="sellItemType"
      >
        <v-btn width="50%" value="item" :to="{ name: 'market.sell.item' }">
          Inventory
        </v-btn>
        <v-btn width="50%" value="sector" :to="{ name: 'market.sell.sector' }">
          Sectors
        </v-btn>
      </v-btn-toggle>
    </v-card>
    <router-view />
  </v-container>
</template>

<script>
import socket from "@/utilities/api/socket";
export default {
  name: "MarketSellView",
  data: () => ({
    sellItemType: "item",
  }),
  beforeMount() {
    this.loadView();
  },
  methods: {
    loadView: async function () {
      await socket.getInventory();
      await this.$router.push({ name: "market.sell.item" });
    },
  },
};
</script>

<style scoped></style>
