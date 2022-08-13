<template>
  <v-list-item
    :style="{
      border: '1px solid rgba(var(--v-theme-secondary),0.1)',
      borderStyle: 'solid hidden solid hidden',
    }"
    width="100%"
    class="pa-1"
    @click="handleClick"
  >
    <v-row class="align-center">
      <v-col class="hidden-xs" sm="2" md="1">
        <v-sheet border class="mr-2 pa-1" height="50" width="50">
          <v-img
            cover=""
            height="50"
            width="50"
            :src="require('@/assets/img/' + image)"
          />
        </v-sheet>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <div class="text-left">{{ name }}</div>
      </v-col>
      <v-col cols="6" sm="4" md="2">
        <div class="text-overline">
          {{ listing.quantity }}
          <span class="pl-1" v-if="type === 'Resource'">kg</span>
        </div>
      </v-col>
      <v-col class="hidden-xs" cols="6" md="2">
        <div>
          <span class="hidden-md-and-up pl-2">Seller: </span>
          {{ listing.seller.username }}
        </div>
      </v-col>
      <v-col cols="6" sm="6" md="4">
        <div>
          <EuaQuantity :quantity="listing.price" />
        </div>
      </v-col>
    </v-row>
  </v-list-item>
</template>

<script>
import itemData from "@/utilities/game-library/items";
import EuaQuantity from "@/components/EuaQuantity";
export default {
  name: "MarketListing",
  components: { EuaQuantity },
  props: {
    listing: {},
    showSeller: Boolean,
  },
  data: () => ({}),
  computed: {
    image: function () {
      return itemData.getImage(this.listing.item.name);
    },
    name: function () {
      return this.listing.item.name;
    },
    type: function () {
      return this.listing.item.type;
    },
    price: function () {
      return this.listing.price;
    },
    seller: function () {
      return this.listing.seller.username;
    },
  },
  methods: {
    handleClick: async function () {
      this.$emit("selected", this.listing);
    },
  },
};
</script>

<style scoped></style>
