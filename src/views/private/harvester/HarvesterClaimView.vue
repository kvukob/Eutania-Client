<template>
  <div>
    <v-card v-if="miningRewards">
      <v-card-title> Mining Rewards </v-card-title>
      <v-card color="transparent">
        <v-card-title class="text-overline text-secondary">
          Resources
        </v-card-title>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="3"
            v-for="reward in miningRewards.rewards"
            :key="reward"
            class="pa-2"
          >
            <v-card border height="100%">
              <div class="justify-center text-center d-flex flex-row mt-3">
                <v-img
                  max-width="50px"
                  :src="
                    require('@/assets/img/items/resource/' +
                      reward.resource.toLowerCase() +
                      '.png')
                  "
                />
              </div>
              <v-card-title class="text-center">
                {{ reward.resource }}
              </v-card-title>
              <v-card variant="tonal" color="secondary" class="text-center">
                {{ formatRewardQuantity(reward.quantity) }} kg
              </v-card>
              <v-card
                class="d-flex flex-column align-center"
                color="transparent"
              >
                <v-chip v-if="reward.commission" variant="text">
                  <v-icon color="error">mdi-sword</v-icon>
                  Commission ({{ formatRewardQuantity(reward.commission) }} kg)
                </v-chip>
                <v-chip v-if="reward.bonus" variant="text">
                  <v-icon color="success">mdi-check</v-icon>
                  Bonus ({{ formatRewardQuantity(reward.bonusQuantity) }} kg)
                </v-chip>
                <v-chip v-if="reward.yieldLoss > 0" variant="text">
                  <v-icon color="error">mdi-cancel</v-icon>
                  Yield Loss ({{ formatRewardQuantity(reward.yieldLoss) }} kg)
                </v-chip>
                <v-chip v-if="reward.isRaided" variant="text">
                  <v-icon color="error">mdi-sword</v-icon>
                  Raided ({{ formatRewardQuantity(reward.raidLoss) }} kg)
                </v-chip>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-card>

      <v-card color="transparent" v-if="didItemDrop">
        <v-card border height="100%">
          <v-card-title class="text-overline text-secondary">
            Item
          </v-card-title>
          <div class="justify-center text-center d-flex flex-row mt-3">
            <v-img
              max-width="50px"
              :src="
                require('@/assets/img/' +
                  getItemImage(miningRewards.itemDropName))
              "
            />
          </div>
          <v-card-title class="text-center">
            {{ miningRewards.itemDropName }}
          </v-card-title>
          <v-card variant="tonal" color="secondary" class="text-center">
            {{ formatRewardQuantity(miningRewards.itemDropQuantity) }}
            <span v-if="miningRewards.itemDropType === 'Resource'">kg</span>
          </v-card>
        </v-card>
      </v-card>

      <v-card color="transparent" v-if="didMineSector">
        <v-card-title class="text-overline text-secondary">
          Sector
        </v-card-title>
        <v-row>
          <v-col cols="12" class="pa-2">
            <v-card border class="pa-2">
              <v-card-title>
                {{ harvesterSector }} on {{ harvesterPlanet }}
                <v-chip>
                  {{ miningRewards.minedSectorRarity }}
                </v-chip>
              </v-card-title>
              <v-sheet color="transparent" border>
                <v-img
                  cover=""
                  height="100"
                  width="100%"
                  :src="
                    require('@/assets/img/planets/' +
                      harvesterPlanet.toLowerCase() +
                      '.png')
                  "
                />
              </v-sheet>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <v-card color="transparent">
        <v-card-actions>
          <v-btn block="" @click="onClaimClick" color="primary" variant="tonal">
            Claim
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import items from "@/utilities/game-library/items";
import { useHarvesterStore } from "@/stores/harvesterStore";
export default {
  name: "HarvesterClaimView",
  data() {
    return {
      harvesterStore: useHarvesterStore(),
    };
  },
  computed: {
    miningRewards: function () {
      return this.harvesterStore.getMiningRewards;
    },
    harvesterSector() {
      return this.harvesterStore.getSectorName;
    },
    harvesterPlanet() {
      return this.harvesterStore.getSectorPlanet;
    },
    didItemDrop() {
      return this.miningRewards.itemDropped;
    },
    didMineSector() {
      return this.miningRewards.minedSector;
    },
  },
  methods: {
    getItemImage(itemName) {
      return items.getImage(itemName);
    },
    onClaimClick: async function () {
      this.harvesterStore.setMiningRewards(null);
      await this.$router.push({ name: "harvester.maintenance" });
    },
    formatRewardQuantity: function (quantity) {
      return Math.round(quantity * 100) / 100;
    },
  },
};
</script>

<style scoped></style>
