<template>
  <v-card>
    <v-card-title class="text-overline text-secondary">
      What's going on here?
    </v-card-title>
    <v-card>
      <v-card-text>
        Start your journey by checking out your
        <v-btn
          density="compact"
          color="primary"
          variant="tonal"
          :to="{ name: 'harvester.connect' }"
        >
          harvester
        </v-btn>
        .
      </v-card-text>
    </v-card>
    <v-divider class="ma-5" />
    <v-expansion-panels v-model="helpPanel">
      <v-expansion-panel value="harvester">
        <v-expansion-panel-title class="text-primary">
          Harvester
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <GameInfoHarvester />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel value="sectors">
        <v-expansion-panel-title class="text-primary">
          Sectors
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <GameInfoSectors />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel value="missions">
        <v-expansion-panel-title class="text-primary">
          Missions
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <GameInfoMissions />
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel value="market">
        <v-expansion-panel-title class="text-primary">
          Market
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <GameInfoMarket />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import GameInfoHarvester from "@/core/bridge/GameInfoHarvester";
import GameInfoSectors from "@/core/bridge/GameInfoSectors";
import GameInfoMissions from "@/core/bridge/GameInfoMissions";
import GameInfoMarket from "@/core/bridge/GameInfoMarket";
export default {
  name: "GameInfoCard",
  components: {
    GameInfoMarket,
    GameInfoMissions,
    GameInfoSectors,
    GameInfoHarvester,
  },
  data: () => ({
    helpPanel: "",
  }),
};
</script>

<style scoped></style>
