<template>
  <div>
    <v-row>
      <v-col cols="12" md="3">
        <v-card variant="plain" color="transparent">
          <v-img
            cover=""
            height="250px"
            :src="require('@/assets/img/harvester/harvester.png')"
          />
        </v-card>
        <v-card v-if="isHarvesterUnassigned" border>
          <v-card-title class="text-center">Awaiting Orders</v-card-title>
          <v-card-actions>
            <v-btn block="" color="primary" @click="onChangeMiningLocation">
              Assign Location
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-if="!isHarvesterUnassigned" border>
          <v-card-title> Actions </v-card-title>
          <v-card-actions class="d-flex flex-column">
            <v-btn
              color="primary"
              block=""
              variant="tonal"
              @click="onMineClick"
              :disabled="disableMine"
              >Mine
            </v-btn>
            <v-divider class="ma-5" />
            <v-btn color="primary" @click="onChangeMiningLocation">
              Change Location
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="9" v-if="!isHarvesterUnassigned">
        <HarvesterDetailsCard />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import * as planetData from "@/utilities/game-library/planets";
import { useHarvesterStore } from "@/stores/harvesterStore";
import HarvesterDetailsCard from "@/core/harvester/HarvesterDetailsCard";
import socket from "@/utilities/api/socket";
export default {
  name: "HarvesterOnlineView",
  components: { HarvesterDetailsCard },
  data: () => ({
    harvesterStore: useHarvesterStore(),
    planetData: planetData,
    changeSector: false,
    disableMine: false,
  }),
  computed: {
    resourceList: function () {
      return this.planetData.getPlanetData();
    },
    isHarvesterUnassigned: function () {
      return this.harvesterStore.getSectorName === "Unassigned";
    },
  },
  methods: {
    onChangeMiningLocation: function () {
      this.$router.push({ name: "harvester.sector" });
    },
    onMineClick: async function () {
      this.disableMine = true;
      await socket.mine();
    },
  },
};
</script>

<style scoped></style>
