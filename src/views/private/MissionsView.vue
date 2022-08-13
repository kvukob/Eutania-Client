<template>
  <GameViewWrapper>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="mission in resourceMissions"
        :key="mission"
      >
        <MissionCard :mission="mission"></MissionCard>
      </v-col>
    </v-row>
  </GameViewWrapper>
</template>

<script>
import { useMissionStore } from "@/stores/missionStore";
import socket from "@/utilities/api/socket";
import MissionCard from "@/core/mission/MissionCard";
import GameViewWrapper from "@/components/GameViewWrapper";

export default {
  name: "MissionsView",
  components: { GameViewWrapper, MissionCard },
  data: () => ({
    missionStore: useMissionStore(),
  }),
  beforeMount() {
    this.loadView();
  },
  computed: {
    resourceMissions: function () {
      return this.missionStore.getResourceMissions;
    },
  },
  methods: {
    loadView: async function () {
      await socket.getResourceMissions();
      await socket.getInventory();
    },
  },
};
</script>

<style scoped></style>
