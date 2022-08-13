<template>
  <div>
    <v-card v-if="sector" border>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-card color="transparent">
              <v-row>
                <v-col cols="2">
                  <v-img
                    height="100px"
                    :src="
                      require('@/assets/img/planets/' +
                        sector.planet.toLowerCase() +
                        '.png')
                    "
                  />
                </v-col>
                <v-col cols="10">
                  <v-card class="pa-2">
                    <v-card-title class="align-center">
                      {{ sector.name }}
                      <RarityChip :rarity="sector.rarity" />
                    </v-card-title>
                    <v-card-subtitle>
                      {{ sector.planet }}
                    </v-card-subtitle>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-divider class="ma-5" />
        <v-row>
          <v-col cols="12" sm="6" md="6" lg="4">
            <v-card height="100%">
              <v-card-title class="text-overline text-secondary">
                Listing Details
              </v-card-title>
              <v-card-text>
                <v-list bg-color="transparent">
                  <v-list-item class="mb-2">
                    <label>Price</label>
                    <v-list-item-title class="text-end">
                      <EuaQuantity :quantity="sector.price" />
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item class="mb-2">
                    <label>Seller</label>
                    <v-list-item-title class="text-end">
                      {{ sector.owner }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="4">
            <v-card height="100%">
              <v-card-title>
                <span class="text-overline text-secondary"> Your Wallet </span>
              </v-card-title>
              <v-list bg-color="transparent">
                <v-list-item>
                  <label>Balance</label>
                  <EuaQuantity :quantity="walletBalance" />
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" lg="4">
            <v-card class="pa-2" height="100%">
              <v-card-title class="text-overline text-secondary">
                Total
              </v-card-title>
              <v-list bg-color="transparent">
                <v-list-item>
                  {{ sector.name }}
                  <v-spacer />
                  <EuaQuantity :quantity="sector.price" />
                </v-list-item>
                <v-list-item>
                  Market Fee
                  <v-spacer />
                  <EuaQuantity :quantity="orderFee" />
                </v-list-item>
                <v-list-item>
                  Total
                  <v-spacer />
                  <EuaQuantity :quantity="orderTotal" />
                </v-list-item>
              </v-list>
              <v-card>
                <v-card-actions v-if="!isConfirming">
                  <v-btn @click="cancel" color="error"> Cancel </v-btn>
                  <v-spacer />
                  <v-btn
                    variant="tonal"
                    color="primary"
                    @click="confirmSubmit"
                    :disabled="canBuy"
                    append-icon="mdi-chevron-right"
                  >
                    Buy
                  </v-btn>
                </v-card-actions>
                <v-alert
                  color="warning"
                  variant="tonal"
                  v-if="isConfirming"
                  class="ma-2"
                >
                  Are you sure you want to buy {{ sector.name }}?
                </v-alert>
                <v-card-actions v-if="isConfirming">
                  <v-btn @click="cancel" color="error"> Cancel </v-btn>
                  <v-spacer />
                  <v-btn
                    variant="tonal"
                    color="primary"
                    @click="submit"
                    append-icon="mdi-chevron-right"
                  >
                    Submit Order
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import fetcher from "@/utilities/api/fetcher";
import routes from "@/utilities/api/fetcher/routes";
import { useWalletStore } from "@/stores/walletStore";
import { useAccountStore } from "@/stores/accountStore";
import EuaQuantity from "@/components/EuaQuantity";
import socket from "@/utilities/api/socket";
import RarityChip from "@/components/RarityChip";
export default {
  name: "MarketSectorOrder",
  components: { RarityChip, EuaQuantity },
  data() {
    return {
      sector: null,
      walletStore: useWalletStore(),
      accountStore: useAccountStore(),
      isConfirming: false,
    };
  },
  beforeMount() {
    this.getSector();
  },
  computed: {
    username() {
      return this.accountStore.getUsername;
    },
    canBuy: function () {
      return (
        this.orderTotal > this.walletBalance ||
        this.sector.owner === this.username
      );
    },
    name: function () {
      return this.$route.params.name;
    },
    walletBalance: function () {
      let balance = this.walletStore.getBalance;
      return balance ? balance : 0;
    },
    orderFee: function () {
      return (this.sector.price * 0.04).toFixed(2);
    },
    orderTotal: function () {
      return this.orderFee
        ? Number.parseFloat(this.sector.price) +
            Number.parseFloat(this.orderFee)
        : 0;
    },
  },
  methods: {
    cancel: function () {
      this.$router.push({ name: "market.browse.sectors" });
    },
    getSector: async function () {
      let response = await fetcher.getData(routes.sector.get + "/" + this.name);
      this.sector = response.data.sector;
    },
    confirmSubmit: function () {
      this.isConfirming = true;
    },
    submit: async function () {
      await socket.buySector(this.sector.name);
    },
  },
};
</script>

<style scoped></style>
