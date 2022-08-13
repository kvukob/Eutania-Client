<template>
  <div>
    <v-img
      :src="require('@/assets/img/spacecraft_corner.png')"
      style="
        width: 100%;
        height: 100%;
        position: fixed;
        bottom: -30%;
        right: 30%;
      "
    >
    </v-img>
    <v-img
      :src="require('@/assets/img/planets/eutania.png')"
      style="width: 100%; height: 100%; position: fixed; top: -60%; left: 50%"
    >
    </v-img>
    <GameNavigation />
    <v-app-bar density="compact" class="ml-0">
      <v-row class="justify-start">
        <v-col class="hidden-xs pa-1" sm="6" md="4" lg="2">
          <v-chip
            style="width: 100%"
            class="align-center justify-space-between"
          >
            <template v-slot:prepend>
              <v-icon color="secondary">mdi-account</v-icon>
            </template>
            {{ username }}
          </v-chip>
        </v-col>
        <v-col class="pa-1" cols="12" sm="6" md="4" lg="2">
          <WalletBalanceChip />
        </v-col>
      </v-row>
    </v-app-bar>
    <v-container fluid class="overflow-y-auto pa-0" :style="cssProps">
      <router-view />
    </v-container>
  </div>
</template>

<script>
import GameNavigation from "@/components/GameNavigation";
import socket from "@/utilities/api/socket";
import WalletBalanceChip from "@/core/wallet/WalletBalanceChip";
import { useAccountStore } from "@/stores/accountStore";
export default {
  name: "GameView",
  components: { WalletBalanceChip, GameNavigation },
  beforeMount() {
    this.loadGame();
  },
  data: () => ({
    cssProps: {
      backgroundImage: `url(${require("@/assets/img/backgrounds/main.png")})`,
      height: `calc(100vh - 48px)`,
      backgroundSize: `cover`,
    },
    accountStore: useAccountStore(),
  }),
  methods: {
    loadGame: async function () {
      // Load initial data
      // These are required by the first route visited
      // The other data gets populated when the routes are visited as normal
      await socket.getWallet();
    },
  },
  computed: {
    username() {
      return this.accountStore.getUsername;
    },
  },
};
</script>

<style scoped></style>
