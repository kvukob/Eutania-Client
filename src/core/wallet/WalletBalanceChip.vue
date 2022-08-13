<template>
  <v-chip style="width: 100%" class="align-center justify-end">
    <div>
      <v-avatar size="small">
        <v-img :src="require('@/assets/img/icons/eua.svg')" />
      </v-avatar>
      {{ walletBalance }}
    </div>
  </v-chip>
</template>

<script>
import { useWalletStore } from "@/stores/walletStore";

export default {
  name: "WalletBalanceChip",
  data: () => ({
    walletStore: useWalletStore(),
  }),
  computed: {
    walletBalance: function () {
      return this.walletStore.getBalance;
    },
  },
};
</script>

<style scoped></style>
