<template>
  <v-card border>
    <v-row>
      <v-col cols="12" sm="3" md="2">
        <v-list bg-color="transparent" class="pa-2" color="primary">
          <v-list-item>
            <label>Planet</label>
            <v-btn-toggle
              mandatory
              @click="getSectors"
              v-model="planetFilter"
              style="height: 100%"
              class="d-flex flex-column"
              variant="text"
              color="primary"
            >
              <v-btn
                v-for="name in ['All', ...planetNames]"
                :key="name"
                class="justify-start"
                :value="name.toLowerCase()"
              >
                {{ name }}
              </v-btn>
            </v-btn-toggle>
          </v-list-item>
          <v-list-item>
            <label>Rarity</label>
            <v-btn-toggle
              mandatory
              @click="getSectors"
              v-model="rarityFilter"
              style="height: 100%"
              class="d-flex flex-column"
            >
              <v-btn
                color="primary"
                variant="text"
                value="all"
                class="justify-start"
                >All</v-btn
              >
              <v-btn
                color="primary"
                variant="text"
                value="common"
                class="justify-start"
                >Common</v-btn
              >
              <v-btn
                color="primary"
                variant="text"
                value="uncommon"
                class="justify-start"
                >Uncommon</v-btn
              >
              <v-btn
                color="primary"
                variant="text"
                value="rare"
                class="justify-start"
                >Rare</v-btn
              >
              <v-btn
                color="primary"
                variant="text"
                value="mythic"
                class="justify-start"
                >Mythic</v-btn
              >
            </v-btn-toggle>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12" sm="9" md="10">
        <v-list border class="pl-1 pr-1">
          <div class="pa-1 text-overline hidden-sm-and-down">
            <v-row>
              <v-col cols="1"></v-col>
              <v-col cols="2">Name</v-col>
              <v-col cols="2">Rarity</v-col>
              <v-col cols="2">Planet</v-col>
              <v-col cols="2">Seller</v-col>
              <v-col cols="3" class="text-center">Price</v-col>
            </v-row>
          </div>
          <v-card
            class="d-flex align-center text-center"
            v-if="sectors.length < 1"
          >
            <v-card-text> No listings found </v-card-text>
          </v-card>
          <MarketSectorCard
            v-for="sector in sectors"
            :key="sector"
            @selected="onListingSelect"
            :listing="sector"
          />
        </v-list>
        <v-pagination v-model="page" :length="length" @click="getSectors" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import fetcher from "@/utilities/api/fetcher";
import routes from "@/utilities/api/fetcher/routes";
import MarketSectorCard from "@/core/market/MarketSectorCard";
import * as planetData from "@/utilities/game-library/planets";
export default {
  name: "MarketSectorsView",
  components: { MarketSectorCard },
  data: () => ({
    planetNames: planetData.Planets.PlanetNames,
    sectors: [],
    page: 1,
    length: 1,
    planetFilter: "all",
    rarityFilter: "all",
  }),
  beforeMount() {
    this.loadView();
  },
  methods: {
    loadView: async function () {
      await this.getSectors();
      this.planetFilter = "all";
      this.rarityFilter = "all";
    },
    getSectors: async function () {
      let route = routes.market.getSectors + "/" + this.page + "?";
      if (this.planetFilter !== "all")
        route += "planet=" + this.planetFilter + "&";
      if (this.rarityFilter !== "all") route += "rarity=" + this.rarityFilter;

      let response = await fetcher.getData(route);
      this.sectors = response.data.sectors;

      let pageCountRaw = response.data.count / 8;
      this.length = Math.trunc(pageCountRaw);

      if (this.length - Math.ceil(pageCountRaw)) {
        this.length++;
      }
    },
    onListingSelect: function (name) {
      this.$router.push({
        name: "market.sector.order",
        params: {
          name: name,
        },
      });
    },
  },
};
</script>

<style scoped></style>
