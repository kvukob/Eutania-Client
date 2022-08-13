<template>
  <GameViewWrapper>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <CargoResourcesCard />
      </v-col>
      <v-col cols="12" sm="6" md="8">
        <CargoItemsCard />
      </v-col>
    </v-row>
  </GameViewWrapper>
</template>

<script>
import CargoResourcesCard from "@/core/cargo/CargoResourcesCard";
import socket from "@/utilities/api/socket";
import CargoItemsCard from "@/core/cargo/CargoItemsCard";
import GameViewWrapper from "@/components/GameViewWrapper";
export default {
  name: "CargoView",
  components: { GameViewWrapper, CargoItemsCard, CargoResourcesCard },
  beforeMount() {
    this.loadView();
  },
  methods: {
    loadView: async function () {
      await socket.getInventory();
    },
  },
};
</script>

<style scoped></style>
