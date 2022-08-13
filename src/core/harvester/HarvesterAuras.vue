<template>
  <v-card class="d-flex flex-wrap">
    <div v-for="equippedItem in equippedItems" :key="equippedItem">
      <v-chip
        v-for="feature in getFeatures(equippedItem.item.name)"
        :key="feature"
        variant="tonal"
        :color="isBuff(feature.text) ? 'success' : 'error'"
      >
        <span class="text-white text-caption">
          {{ feature.text }}
        </span>
      </v-chip>
    </div>
  </v-card>
</template>

<script>
import { useInventoryStore } from "@/stores/inventoryStore";
import itemData from "@/utilities/game-library/items";
export default {
  name: "HarvesterAuras",
  data: () => ({
    inventoryStore: useInventoryStore(),
  }),
  computed: {
    equippedItems: function () {
      return this.inventoryStore.getEquippedHarvesterItems;
    },
  },
  methods: {
    getFeatures: function (itemName) {
      return itemData.getFeatures(itemName);
    },
    isBuff: function (featureText) {
      if (featureText.length) {
        return featureText.includes("+");
      }
      return false;
    },
  },
};
</script>

<style scoped></style>
