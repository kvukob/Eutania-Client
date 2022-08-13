<template>
  <v-card border>
    <v-row>
      <v-col md="12">
        <v-card color="transparent">
          <v-card-title class="d-flex align-center">
            <div class="d-flex align-center">
              <v-chip :color="color(mission.rarity)">
                {{ mission.rarity }}
              </v-chip>
              {{ mission.name }}
            </div>
            <v-spacer />
            <v-chip variant="text" class="text-overline">
              {{ mission.missionCode }}
            </v-chip>
          </v-card-title>
          <v-card-subtitle class="text-wrap">
            <div style="height: 50px" class="overflow-y-auto">
              {{ mission.description }}
            </div>
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col md="12">
        <v-card border class="ma-5">
          <v-card-text class="text-overline text-secondary">
            Mission Requirements
          </v-card-text>
          <v-card-text>
            <div style="height: 100px" class="overflow-y-auto">
              <v-chip
                border
                variant="text"
                v-for="requirement in requirements(mission)"
                :key="requirement"
                class="ma-1"
                :color="hasMetRequirements(mission) ? 'success' : ''"
              >
                {{ requirement.owned }} / {{ requirement.quantity }}
                {{ requirement.name }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="12">
        <v-card color="transparent" class="d-flex">
          <v-card-text>
            <span class="text-secondary">Completions</span>
            <v-spacer />
            {{ mission.completionCount }} /
            {{ mission.maxCompletions }}
          </v-card-text>
          <v-card-text>
            <span class="text-secondary">Fulfillment Reward</span>
            <v-spacer />
            <EuaQuantity :quantity="mission.reward" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="12">
        <v-card color="transparent">
          <v-card-actions>
            <v-alert
              class="text-center"
              v-if="!hasMetRequirements(mission)"
              color="error"
            >
              Mission Requirements Not Met
            </v-alert>
            <v-btn
              v-if="hasMetRequirements(mission)"
              block=""
              color="primary"
              @click="onCompleteMissionClick"
              variant="tonal"
            >
              Complete Mission
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { useInventoryStore } from "@/stores/inventoryStore";
import socket from "@/utilities/api/socket";
import EuaQuantity from "@/components/EuaQuantity";
import colors from "@/utilities/game-library/colors";
export default {
  name: "MissionCard",
  components: { EuaQuantity },
  props: {
    mission: {
      name: String,
      missionCode: String,
      description: String,
      rarity: String,
      completionCount: Number,
      maxCompletions: Number,
      reward: Number,
      avanthium: Number,
      bulrium: Number,
      caelyrium: Number,
      liavine: Number,
      murissine: Number,
      mythine: Number,
      orythium: Number,
      phytemicium: Number,
      sangunalt: Number,
      vohphos: Number,
    },
  },
  data: () => ({
    inventoryStore: useInventoryStore(),
  }),
  methods: {
    onCompleteMissionClick: async function () {
      await socket.completeResourceMission(this.mission.missionCode);
    },
    getResourceBalance: function (resource) {
      return this.inventoryStore.getResourceQtyByName(resource);
    },
    hasMetRequirements: function (item) {
      let x = this.requirements(item);
      let requirementsMet = true;
      x.forEach((r) => {
        if (r.owned < r.quantity) requirementsMet = false;
      });
      return requirementsMet;
    },
    requirements: function (mission) {
      if (mission) {
        let reqList = [];
        if (mission["avanthium"] > 0)
          reqList.push({
            name: "Avanthium",
            quantity: mission["avanthium"],
            owned: this.getResourceBalance("Avanthium"),
          });
        if (mission["bulrium"] > 0)
          reqList.push({
            name: "Bulrium",
            quantity: mission["bulrium"],
            owned: this.getResourceBalance("Bulrium"),
          });
        if (mission["caelyrium"] > 0)
          reqList.push({
            name: "Caelyrium",
            quantity: mission["caelyrium"],
            owned: this.getResourceBalance("Caelyrium"),
          });
        if (mission["liavine"] > 0)
          reqList.push({
            name: "Liavine",
            quantity: mission["liavine"],
            owned: this.getResourceBalance("Liavine"),
          });
        if (mission["murissine"] > 0)
          reqList.push({
            name: "Murissine",
            quantity: mission["murissine"],
            owned: this.getResourceBalance("Murissine"),
          });
        if (mission["mythine"] > 0)
          reqList.push({
            name: "Mythine",
            quantity: mission["mythine"],
            owned: this.getResourceBalance("Mythine"),
          });
        if (mission["orythium"] > 0)
          reqList.push({
            name: "Orythium",
            quantity: mission["orythium"],
            owned: this.getResourceBalance("Orythium"),
          });
        if (mission["phytemicium"] > 0)
          reqList.push({
            name: "Phytemicium",
            quantity: mission["phytemicium"],
            owned: this.getResourceBalance("Phytemicium"),
          });
        if (mission["sangunalt"] > 0)
          reqList.push({
            name: "Sangunalt",
            quantity: mission["sangunalt"],
            owned: this.getResourceBalance("Sangunalt"),
          });
        if (mission["tausmium"] > 0)
          reqList.push({
            name: "Tausmium",
            quantity: mission["tausmium"],
            owned: this.getResourceBalance("Tausmium"),
          });
        if (mission["vohphos"] > 0)
          reqList.push({
            name: "Vohphos",
            quantity: mission["vohphos"],
            owned: this.getResourceBalance("Vohphos"),
          });
        return reqList;
      }
    },
    color(rarity) {
      return colors.getRarityColor(rarity);
    },
  },
};
</script>

<style scoped></style>
