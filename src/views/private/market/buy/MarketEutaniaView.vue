<template>
  <v-card border>
    <v-row>
      <v-col cols="12" sm="3" md="2">
        <v-list
          bg-color="transparent"
          rounded="lg"
          class="pa-2"
          v-model="itemType"
          color="primary"
          mandatory
        >
          <v-list-group>
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" value="Resource" color="secondary">
                Resources
              </v-list-item>
            </template>
            <v-btn-toggle
              v-model="category"
              @click="changeListingSearchType('name')"
              mandatory
              style="height: 100%"
              class="d-flex flex-column"
              variant="text"
              color="primary"
            >
              <v-btn
                :value="resource"
                v-for="resource in [
                  'All',
                  ...resourceData.Resources.ResourceNames,
                ]"
                :key="resource"
                class="justify-start"
                @click="
                  changeListingSearchType('name');
                  getListings(resource);
                "
              >
                {{ resource }}
              </v-btn>
            </v-btn-toggle>
          </v-list-group>
          <v-list-group color="secondary">
            <template v-slot:activator="{ props }">
              <v-list-item rounded="lg" v-bind="props" value="Harvester">
                Harvester
              </v-list-item>
            </template>
            <v-btn-toggle
              mandatory
              style="height: 100%"
              class="d-flex flex-column"
              variant="text"
              color="primary"
              v-model="category"
            >
              <v-btn
                class="justify-start"
                value="Harvester Tool"
                @click="
                  changeListingSearchType('type');
                  getListings('Harvester Tool');
                "
              >
                Tools
              </v-btn>
              <v-btn
                class="justify-start"
                value="Harvester Weapon"
                @click="
                  changeListingSearchType('type');
                  getListings('Harvester Weapon');
                "
              >
                Weapons
              </v-btn>
              <v-btn
                class="justify-start"
                value="Harvester Protection"
                @click="
                  changeListingSearchType('type');
                  getListings('Harvester Protection');
                "
              >
                Protection
              </v-btn>
            </v-btn-toggle>
          </v-list-group>
        </v-list>
      </v-col>
      <v-col cols="12" sm="9" md="10">
        <v-list border class="pl-1 pr-1">
          <div class="pa-1 text-overline hidden-sm-and-down">
            <v-row>
              <v-col cols="1"></v-col>
              <v-col cols="3">Name</v-col>
              <v-col cols="2">Quantity</v-col>
              <v-col cols="2">Seller</v-col>
              <v-col cols="4" class="text-center">Price</v-col>
            </v-row>
          </div>
          <v-card
            class="d-flex align-center text-center"
            v-if="listings.length < 1"
          >
            <v-card-text> No listings found </v-card-text>
          </v-card>
          <MarketListing
            v-for="listing in listings"
            :key="listing"
            @selected="onListingSelect"
            :listing="listing"
          />
        </v-list>
        <v-pagination v-model="page" :length="length" @click="getListings" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import MarketListing from "@/core/market/MarketListing";
import fetcher from "@/utilities/api/fetcher";
import routes from "@/utilities/api/fetcher/routes";
import * as resourceData from "@/utilities/game-library/resources";
export default {
  name: "MarketEutaniaView",
  components: { MarketListing },
  data() {
    return {
      listingSearchType: "type",
      resourceData: resourceData,
      itemType: "",
      listings: [],
      selectedMarket: 0,
      category: "resource",
      page: 1,
      length: 1,
    };
  },
  beforeMount() {
    this.getListings(this.category);
  },
  methods: {
    changeListingSearchType: function (type) {
      this.listingSearchType = type;
      this.length = 1;
      this.page = 1;
    },
    calculateLength: function (count) {
      if (count <= 8) this.length = 1;
      else this.length = Math.ceil(count / 8);
    },
    getListings: async function () {
      switch (this.listingSearchType) {
        case "name":
          await this.getListingsByItemName(this.category);
          break;
        default:
          await this.getListingsByType(this.category);
          break;
      }

      if (this.length === 0) this.page = 1;
    },
    getListingsByItemName: async function (itemType) {
      if (itemType === "All") await this.getListingsByType("Resource");
      else {
        const response = await fetcher.getData(
          routes.market.getListingsByName +
            "/" +
            itemType +
            "/" +
            this.page +
            "?"
        );
        this.listings = response.data.listings;

        this.calculateLength(response.data.count);
      }
    },
    getListingsByType: async function (itemType) {
      const response = await fetcher.getData(
        routes.market.getListingsByType + "/" + itemType + "/" + this.page + "?"
      );
      this.listings = response.data.listings;
      console.log(response.data);
      this.calculateLength(response.data.count);
    },
    onListingSelect: function (listing) {
      this.$router.push({
        name: "market.order",
        params: {
          id: listing.id,
        },
      });
    },
  },
};
</script>

<style scoped></style>
