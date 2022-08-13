<template>
  <v-card>
    <v-row>
      <v-col cols="12" md="3">
        <v-card color="transparent">
          <v-card-title class="text-overline text-secondary">
            Owned Sectors
          </v-card-title>
          <v-card
            border
            v-if="!ownedSectors.length"
            style="height: calc(100vh - 350px)"
          >
            <v-card-text class="text-overline text-center">
              <v-alert variant="tonal"> No Owned Sectors </v-alert>
              <v-divider class="ma-5" />
              <v-alert variant="tonal" color="info">
                There is a chance to claim unowned sectors when mining,
                otherwise, you can buy one off the market.
              </v-alert>
            </v-card-text>
          </v-card>
          <v-list
            v-if="ownedSectors.length"
            border
            class="overflow-y-auto"
            style="height: calc(100vh - 350px)"
            bg-color="transparent"
          >
            <v-list-item
              v-for="sector in ownedSectors"
              :key="sector"
              :to="{
                name: 'sector.details',
                params: {
                  name: sector.name.toLowerCase(),
                },
              }"
            >
              <template v-slot:prepend>
                <v-sheet class="mr-2">
                  <v-img
                    width="35"
                    height="35"
                    :src="
                      require('@/assets/img/planets/' +
                        sector.planet.toLowerCase() +
                        '.png')
                    "
                  />
                </v-sheet>
              </template>
              <v-list-item-title class="text-overline">
                {{ sector.name }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col md="9">
        <router-view />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { useInventoryStore } from "@/stores/inventoryStore";
import socket from "@/utilities/api/socket";
export default {
  name: "SectorView",
  data: () => ({
    inventoryStore: useInventoryStore(),
  }),
  beforeMount() {
    this.loadView();
  },
  computed: {
    ownedSectors: function () {
      return this.inventoryStore.getSectors;
    },
  },
  methods: {
    loadView: async function () {
      await socket.getInventory();
    },
  },
};
</script>

<style scoped></style>
