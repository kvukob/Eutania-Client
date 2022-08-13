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
            height="50"
            width="50"
            :src="
              require('@/assets/img/planets/' +
                listing.sector.planet.toLowerCase() +
                '.png')
            "
          />
        </v-sheet>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <div class="text-left">
          {{ listing.sector.name }}
        </div>
      </v-col>
      <v-col cols="6" sm="2" md="2" class="text-left">
        <RarityChip :rarity="listing.sector.rarity" />
      </v-col>
      <v-col sm="4" md="2" class="hidden-sm-and-down">
        <div class="text-overline">
          {{ listing.sector.planet }}
        </div>
      </v-col>
      <v-col sm="6" md="2" class="hidden-xs">
        <div>
          <span class="pl-2 hidden-md-and-up">Seller: </span>
          {{ listing.owner }}
        </div>
      </v-col>
      <v-col cols="6" sm="6" md="3">
        <div>
          <EuaQuantity :quantity="listing.sector.price" />
        </div>
      </v-col>
    </v-row>
  </v-list-item>
</template>

<script>
import EuaQuantity from "@/components/EuaQuantity";
import RarityChip from "@/components/RarityChip";
export default {
  name: "MarketSectorCard",
  components: { RarityChip, EuaQuantity },
  props: {
    listing: Object,
  },
  methods: {
    handleClick: async function () {
      this.$emit("selected", this.listing.sector.name.toLowerCase());
    },
  },
};
</script>

<style scoped></style>
