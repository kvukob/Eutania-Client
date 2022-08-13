<template>
  <v-card height="100%" color="transparent" class="mt-12">
    <v-row>
      <v-col cols="12">
        <v-card
          class="text-center align-center justify-center"
          color="transparent"
        >
          <v-sheet color="transparent" border>
            <v-img
              cover=""
              height="100"
              width="100%"
              :src="
                require('@/assets/img/planets/' +
                  sector.planet.toLowerCase() +
                  '.png')
              "
            />
          </v-sheet>
          <v-card-title>
            {{ sectorName }}
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" v-if="sector.forSale">
        <v-card>
          <v-alert color="info">
            <v-alert-title>
              This sector is listed for sale on the market and cannot be
              modified.
              <br />
              Sectors listed on the market receive no commission.
            </v-alert-title>
          </v-alert>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" v-if="!sector.forSale">
        <SectorCommissionRateCard
          :commission-rate="sector.commission"
          :sector-name="sectorName"
          :disabled="canModifyTimeSeconds > 0"
          :canModifyTime="canModifyTimeMinutes"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { useInventoryStore } from "@/stores/inventoryStore";
import SectorCommissionRateCard from "@/core/sector/SectorCommissionRateCard";
import moment from "moment";
export default {
  name: "SectorDetailView",
  components: { SectorCommissionRateCard },
  data: () => ({
    inventoryStore: useInventoryStore(),
  }),
  computed: {
    sectorName: function () {
      return this.$route.params.name.toUpperCase();
    },
    sector: function () {
      return this.inventoryStore.getSectorByName(this.sectorName);
    },
    canModifyTimeMinutes: function () {
      let now = moment().utc();
      let lastModified = this.sector.commissionChangeTimestamp;
      if (!lastModified.toString().includes("Z")) lastModified += "Z";
      return moment(lastModified).diff(now, "minutes");
    },
    canModifyTimeSeconds: function () {
      let now = moment().utc();
      let lastModified = this.sector.commissionChangeTimestamp;
      if (!lastModified.toString().includes("Z")) lastModified += "Z";
      return moment(lastModified).diff(now, "seconds");
    },
  },
};
</script>

<style scoped></style>
