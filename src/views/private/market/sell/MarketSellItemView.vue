<template>
  <v-card border>
    <v-row>
      <v-col cols="12" sm="6" md="6" lg="4">
        <v-card border height="500px">
          <v-card-title class="text-overline text-secondary">
            <v-text-field
              prepend-icon="mdi-filter"
              v-model="itemFilter"
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-list border class="overflow-y-auto" height="438px" mandatory>
            <v-list-item
              v-for="item in filteredItems.filter((i) => i.equipped !== true)"
              :key="item"
              :value="item"
              @click="onInventoryItemSelect(item)"
              two-lines
              :title="item.item.name"
              :subtitle="formatQuantity(item.quantity, item.item.type)"
            >
              <template v-slot:prepend>
                <v-sheet border class="mr-2">
                  <v-img
                    cover=""
                    height="50"
                    width="50"
                    :src="require('@/assets/img/' + image(item.item.name))"
                  />
                </v-sheet>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="4">
        <v-card class="pa-2" v-if="selectedItem" height="100%">
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
                  require('@/assets/img/' + image(this.selectedItem.item.name))
                "
              />
            </v-sheet>
            <v-card-title>
              {{ selectedItem.item.name }}
            </v-card-title>
            <v-card-text>
              {{ selectedItem.quantity }}
              <span v-if="selectedItem.item.type === 'Resource'">kg</span>
            </v-card-text>
          </v-card>

          <v-card-title class="text-overline mb-2 text-secondary">
            Order Specifications
          </v-card-title>
          <v-card-text>
            <label>Quantity</label>
            <v-form ref="form" v-model="validForm">
              <v-text-field
                :rules="[quantityToSellRules, validQuantityRule]"
                type="number"
                persistent-hint=""
                :hint="
                  'Maximum: ' +
                  formatQuantity(selectedItem.quantity, selectedItem.item.type)
                "
                v-model="form.quantityToSell"
              />
              <label>Price</label>
              <v-text-field
                :rules="priceRules"
                type="number"
                v-model="form.sellPrice"
                suffix="EUA"
              />
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="4">
        <v-card class="pa-2" height="100%" v-if="selectedItem">
          <v-card-title class="text-overline text-secondary">
            Total
          </v-card-title>
          <v-list bg-color="transparent">
            <v-list-item>
              {{ selectedItem.item.name }} x
              {{ formatQuantity(form.quantityToSell, selectedItem.item.type) }}
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
              Are you sure you want to sell {{ form.quantityToSell }}
              {{ selectedItem.item.name }} ?
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
import itemData from "@/utilities/game-library/items";
import EuaQuantity from "@/components/EuaQuantity";
import socket from "@/utilities/api/socket";
import formatter from "@/utilities/formatter";

export default {
  name: "MarketSellItemView",
  components: { EuaQuantity },
  data: () => ({
    inventoryStore: useInventoryStore(),
    selectedItem: null,
    form: {
      quantityToSell: 0,
      sellPrice: 0,
    },
    validForm: false,
    isConfirming: false,
    itemFilter: "",
    filteredItems: [],
    quantityToSellRules: (v) => !!v || "Enter a quantity",
    priceRules: [
      (v) => !!v || "Enter a price",
      (v) => v >= 0 || "Price must be greater than 0",
    ],
  }),
  watch: {
    itemFilter: function () {
      if (this.itemFilter.length > 0) {
        this.filteredItems = this.inventoryItems.filter(
          (i) =>
            i.item.name.toLowerCase().includes(this.itemFilter.toLowerCase()) ||
            i.item.type.toLowerCase().includes(this.itemFilter.toLowerCase())
        );
      } else {
        this.filteredItems = this.inventoryItems;
      }
    },
  },
  beforeMount() {
    this.filteredItems = this.inventoryItems;
  },
  computed: {
    validQuantityRule() {
      return () =>
        this.form.quantityToSell <= this.selectedItem.quantity ||
        "Enter a valid quantity";
    },
    inventoryItems() {
      return this.inventoryStore.getAllGameItems;
    },
    itemTotal: function () {
      return this.form.sellPrice * this.form.quantityToSell;
    },
    orderFee: function () {
      return this.itemTotal * 0.04;
    },
    orderTotal: function () {
      let sum = 0;
      sum =
        Number.parseFloat(this.itemTotal) + Number.parseFloat(this.orderFee);
      return sum;
    },
  },
  methods: {
    formatQuantity: function (number, itemType) {
      let x = formatter.formatDecimals(number);
      if (itemType === "Resource") x += " kg";
      return x;
    },
    toggleConfirmSubmit: function () {
      this.isConfirming = !this.isConfirming;
    },
    cancel: async function () {
      await this.$router.push({ name: "market.browse.eutania" });
    },
    image: function (itemName) {
      return itemData.getImage(itemName);
    },
    onInventoryItemSelect: function (item) {
      if (this.$refs.form) this.$refs.form.reset();
      this.selectedItem = item;
      this.isConfirming = false;
    },
    submit: async function () {
      this.$refs.form.validate();
      if (this.validForm) {
        await socket.sellListing(
          this.selectedItem.item.name,
          this.form.quantityToSell * 1.0,
          this.form.sellPrice * 1.0
        );
      }
    },
  },
};
</script>

<style scoped></style>
