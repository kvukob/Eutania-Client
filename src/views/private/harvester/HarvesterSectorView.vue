<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12" md="5" lg="3" xl="2">
        <v-card height="100%" class="d-flex flex-column">
          <v-card-text class="justify-center">
            <label>Planet</label>
            <v-select
              :items="planetNames"
              hide-messages="true"
              style="max-width: 30ch"
              v-model="selectedPlanet"
            />
            <v-divider />
            <v-alert color="info" v-if="!selectedSector" class="ma-2">
              <v-alert-title class="text-overline justify-center">
                No sector selected
              </v-alert-title>
              <v-sheet class="text-left">
                Select a sector on the map to view it's details.
              </v-sheet>
            </v-alert>
            <v-list v-if="selectedSector">
              <v-alert
                v-if="!selectedSector.owner"
                class="text-center ma-2"
                color="success"
              >
                <v-alert-title class="text-overline justify-center">
                  This sector can be mined
                </v-alert-title>
                <v-sheet class="text-left">
                  Unowned sectors have a small chance of being rewarded on each
                  mine attempt.
                </v-sheet>
              </v-alert>
              <v-list-item v-if="selectedSector.owner">
                <v-list-item-title class="text-overline text-secondary">
                  Owner
                </v-list-item-title>
                <v-spacer />
                <v-chip>{{ selectedSector.owner }}</v-chip>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="text-overline text-secondary">
                  Commission
                </v-list-item-title>
                <v-spacer />
                <v-chip>{{ selectedSector.commission }}%</v-chip>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="text-overline text-secondary">
                  Rarity
                </v-list-item-title>
                <v-spacer />
                <RarityChip :rarity="selectedSector.rarity" />
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions v-if="selectedSector">
            <v-btn
              block=""
              variant="tonal"
              color="primary"
              @click="onMoveToSectorClick"
            >
              Move to {{ selectedSector.name }}
            </v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn block="" color="error" :to="{ name: 'harvester.online' }">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="7" lg="9" xl="10">
        <v-card height="100%" class="pa-2 d-flex align-center">
          <SectorMap
            :planet-name="selectedPlanet"
            @selected-sector="onSectorSelect"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import * as planetData from "@/utilities/game-library/planets";
import socket from "@/utilities/api/socket";
import SectorMap from "@/core/harvester/SectorMap";
import RarityChip from "@/components/RarityChip";
export default {
  name: "HarvesterSectorView",
  components: { RarityChip, SectorMap },
  data: () => ({
    planetNames: planetData.Planets.PlanetNames,
    selectedPlanet: "Eutania",
    selectedSector: null,
  }),
  methods: {
    onSectorSelect: function (sector) {
      this.selectedSector = sector;
    },
    onMoveToSectorClick: async function () {
      await socket.setHarvesterSector(this.selectedSector.name);
    },
  },
  watch: {
    selectedPlanet: function () {
      this.selectedSector = null;
    },
  },
};
</script>

<style scoped></style>
