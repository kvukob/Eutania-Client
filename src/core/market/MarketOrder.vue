<template>
  <div>
    <v-card v-if="listing" border>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-card color="transparent">
              <v-row>
                <v-col cols="2">
                  <v-img
                    height="100px"
                    :src="require('@/assets/img/' + image)"
                  />
                </v-col>
                <v-col cols="10">
                  <v-card class="pa-2">
                    <v-card-title>
                      {{ listing.item.name }}
                    </v-card-title>
                    <v-card-subtitle>
                      {{ listing.item.type }}
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
              <v-list bg-color="transparent">
                <v-list-item class="mb-2">
                  <label>Price</label>
                  <v-list-item-title>
                    <EuaQuantity :quantity="listing.price" />
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="mb-2">
                  <label>Quantity</label>
                  <v-list-item-title class="text-end">
                    <span v-if="listing.quantity > 0">
                      {{ listing.quantity }}
                      <span v-if="listing.item.type === 'Resource'"> kg </span>
                    </span>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="mb-2">
                  <label>Seller</label>
                  <v-list-item-title class="text-end">
                    {{ listing.seller.username }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
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
                  {{ listing.item.name }} x {{ listing.quantity }}
                  <v-spacer />
                  <EuaQuantity :quantity="itemTotal" />
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
                <v-alert color="warning" v-if="isConfirming" class="ma-2">
                  Are you sure you want to buy {{ listing.quantity }}
                  {{ listing.item.name }} ?
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
import itemData from "@/utilities/game-library/items";
import EuaQuantity from "@/components/EuaQuantity";
import socket from "@/utilities/api/socket";
export default {
  name: "MarketOrder",
  components: { EuaQuantity },
  data() {
    return {
      listing: null,
      walletStore: useWalletStore(),
      accountStore: useAccountStore(),
      isConfirming: false,
      validForm: false,
    };
  },
  computed: {
    username() {
      return this.accountStore.getUsername;
    },
    canBuy: function () {
      return (
        this.orderTotal > this.walletBalance ||
        this.listing.seller.username === this.username
      );
    },
    id: function () {
      return this.$route.params.id;
    },
    image: function () {
      return itemData.getImage(this.listing.item.name);
    },
    walletBalance: function () {
      let balance = this.walletStore.getBalance;
      return balance ? balance : 0;
    },
    itemTotal: function () {
      return this.listing.price;
    },
    orderFee: function () {
      return (this.itemTotal * 0.04).toFixed(2);
    },
    orderTotal: function () {
      let sum = 0;
      sum =
        Number.parseFloat(this.itemTotal) + Number.parseFloat(this.orderFee);
      return this.orderFee ? sum.toFixed(2) : 0;
    },
  },
  beforeMount() {
    this.getListing();
  },
  methods: {
    cancel: async function () {
      await this.$router.push({ name: "market.browse.eutania" });
    },
    getListing: async function () {
      let response = await fetcher.getData(
        routes.market.getByListingId + "/" + this.id
      );
      this.listing = response.data.listing;
    },
    confirmSubmit: function () {
      this.isConfirming = true;
    },
    submit: async function () {
      await socket.buyListing(this.listing.id);
    },
  },
};
</script>

<style scoped></style>
