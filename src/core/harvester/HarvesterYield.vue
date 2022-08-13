<template>
  <v-card class="d-flex flex-wrap">
    <ResourceChip
      v-for="resource in resourceList"
      :key="resource"
      :resource="resource"
    />
  </v-card>
</template>

<script>
import { useHarvesterStore } from "@/stores/harvesterStore";
import ResourceChip from "@/components/ResourceChip";
import * as planetData from "@/utilities/game-library/planets";
export default {
  name: "HarvesterYield",
  components: { ResourceChip },
  data: () => ({
    harvesterStore: useHarvesterStore(),
  }),
  computed: {
    resourceList: function () {
      return planetData.getPlanetData(this.harvesterStore.getSectorPlanet)
        .Resources;
    },
  },
};
</script>

<style scoped></style>
