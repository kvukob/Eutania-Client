<template>
  <v-card border>
    <v-row>
      <v-col cols="12" sm="6" md="6" lg="4">
        <v-card border height="500px">
          <v-card-title class="text-overline text-secondary">
            <v-text-field
              prepend-icon="mdi-filter"
              v-model="sectorFilter"
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-list border class="overflow-y-auto" height="438px" mandatory>
            <v-list-item
              v-for="sector in filteredSectors.filter(
                (i) => i.forSale !== true
              )"
              :key="sector"
              :value="sector"
              @click="onInventorySectorSelect(sector)"
              three-lines
              :subtitle="sector.planet"
            >
              <template v-slot:title>
                {{ sector.name }}
                <RarityChip :rarity="sector.rarity" />
              </template>
              <template v-slot:prepend>
                <v-sheet border class="mr-2">
                  <v-img
                    cover=""
                    height="50"
                    width="50"
                    :src="
                      require('@/assets/img/planets/' +
                        sector.planet.toLowerCase() +
                        '.png')
                    "
                  />
                </v-sheet>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="4">
        <v-card class="pa-2" v-if="selectedSector" height="100%">
          <v-card
            color="transparent"
            class="d-flex flex-column align-center justify-center"
          >
            <v-sheet
              min-height="102px"
              width="100%"
              class="d-flex justify-center"
            >
              <v-img
                width="100%"
                max-height="100px"
                :src="
                  require('@/assets/img/planets/' +
                    selectedSector.planet.toLowerCase() +
                    '.png')
                "
              />
            </v-sheet>
            <v-card-title>
              {{ selectedSector.name }}
            </v-card-title>
            <v-card-title>
              <RarityChip :rarity="selectedSector.rarity" />
            </v-card-title>
          </v-card>

          <v-card-title class="text-overline mb-2 text-secondary">
            Order Specifications
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="validForm">
              <label>Price</label>
              <v-text-field
                :rules="priceRules"
                type="number"
                v-model="form.sellPrice"
                suffix="EUA"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="4">
        <v-card class="pa-2" height="100%" v-if="selectedSector">
          <v-card-title class="text-overline text-secondary">
            Total
          </v-card-title>
          <v-list bg-color="transparent">
            <v-list-item>
              {{ selectedSector.name }}
              <v-spacer />
              <EuaQuantity :quantity="sectorTotal" />
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
              <v-btn variant="tonal" @click="cancel" color="error">
                Cancel
              </v-btn>
              <v-spacer />
              <v-btn
                variant="tonal"
                color="primary"
                @click="toggleConfirmSubmit"
              >
                Sell
              </v-btn>
            </v-card-actions>
            <v-alert color="warning" v-if="isConfirming" class="ma-2">
              Are you sure you want to sell {{ selectedSector.planet }} ?
            </v-alert>
            <v-card-actions v-if="isConfirming">
              <v-btn variant="tonal" @click="toggleConfirmSubmit" color="error">
                Cancel
              </v-btn>
              <v-spacer />
              <v-btn variant="tonal" color="primary" @click="submit">
                Submit Order
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { useInventoryStore } from "@/stores/inventoryStore";
import EuaQuantity from "@/components/EuaQuantity";
import formatter from "@/utilities/formatter";
import socket from "@/utilities/api/socket";
import RarityChip from "@/components/RarityChip";

export default {
  name: "MarketSellSectorsView",
  components: { RarityChip, EuaQuantity },
  data: () => ({
    inventoryStore: useInventoryStore(),
    selectedSector: null,
    form: {
      sellPrice: null,
    },
    priceRules: [
      (v) => !!v || "Enter a price",
      (v) => v >= 0 || "Price must be greater than 0",
    ],
    validForm: false,
    isConfirming: false,
    sectorFilter: "",
    filteredSectors: [],
  }),
  watch: {
    sectorFilter: function () {
      if (this.sectorFilter.length > 0) {
        this.filteredSectors = this.ownedSectors.filter(
          (i) =>
            i.name.toLowerCase().includes(this.sectorFilter.toLowerCase()) ||
            i.planet.toLowerCase().includes(this.sectorFilter.toLowerCase())
        );
      } else {
        this.filteredSectors = this.ownedSectors;
      }
    },
  },
  beforeMount() {
    this.filteredSectors = this.ownedSectors;
  },
  computed: {
    ownedSectors() {
      return this.inventoryStore.getSectors;
    },
    sectorTotal: function () {
      return this.form.sellPrice ? this.form.sellPrice : 0;
    },
    orderFee: function () {
      return this.sectorTotal * 0.04;
    },
    orderTotal: function () {
      let sum = 0;
      sum =
        Number.parseFloat(this.sectorTotal) + Number.parseFloat(this.orderFee);
      return sum;
    },
  },
  methods: {
    formatQuantity: function (number) {
      return formatter.formatDecimals(number);
    },
    toggleConfirmSubmit: function () {
      this.isConfirming = !this.isConfirming;
    },
    cancel: async function () {
      await this.$router.push({ name: "market.browse.eutania" });
    },
    onInventorySectorSelect: function (sector) {
      if (this.$refs.form) this.$refs.form.reset();
      this.selectedSector = sector;
      this.isConfirming = false;
    },
    submit: async function () {
      this.$refs.form.validate();
      if (this.validForm) {
        await socket.sellSector(
          this.selectedSector.name,
          this.form.sellPrice * 1.0
        );
      }
    },
  },
};
</script>

<style scoped></style>
