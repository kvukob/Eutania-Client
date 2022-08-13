<template>
  <v-card border>
    <v-card>
      <v-card-title class="text-overline text-secondary">
        Location
      </v-card-title>
      <v-card-text class="d-flex align-center">
        {{ sectorName }}
        <v-icon>mdi-chevron-right</v-icon>
        <RarityChip :rarity="sectorRarity" />
        <v-chip class="text-overline" density="compact">
          {{ sectorCommission }}% commission
        </v-chip>
      </v-card-text>
    </v-card>
    <v-card color="transparent">
      <v-card-title class="text-overline text-secondary">
        Mining Yield
      </v-card-title>
      <HarvesterYield />
    </v-card>
    <v-card color="transparent">
      <v-card-title class="text-overline text-secondary">Auras</v-card-title>
      <HarvesterAuras />
    </v-card>
    <v-card color="transparent">
      <v-card-title class="text-overline text-secondary">Upgrades</v-card-title>
      <v-row class="d-flex flex-column">
        <v-col cols="12">
          <HarvesterEquipCard item-type="Harvester Tool" />
        </v-col>
        <v-col cols="12">
          <HarvesterEquipCard item-type="Harvester Weapon" />
        </v-col>
        <v-col cols="12">
          <HarvesterEquipCard item-type="Harvester Protection" />
        </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
import { useHarvesterStore } from "@/stores/harvesterStore";
import HarvesterEquipCard from "@/core/harvester/HarvesterEquipCard";
import HarvesterAuras from "@/core/harvester/HarvesterAuras";
import HarvesterYield from "@/core/harvester/HarvesterYield";
import RarityChip from "@/components/RarityChip";
export default {
  name: "HarvesterDetailsCard",
  components: {
    RarityChip,
    HarvesterYield,
    HarvesterAuras,
    HarvesterEquipCard,
  },
  data: () => ({
    harvesterStore: useHarvesterStore(),
  }),
  computed: {
    sectorName: function () {
      return this.harvesterStore.getSectorName;
    },
    sectorRarity: function () {
      return this.harvesterStore.getSectorRarity.toString();
    },
    sectorCommission() {
      return this.harvesterStore.getSectorCommission;
    },
  },
};
</script>

<style scoped></style>
