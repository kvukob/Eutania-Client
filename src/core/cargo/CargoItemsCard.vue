<template>
  <v-card border>
    <v-card-title class="text-secondary text-overline">
      <v-row>
        <v-col cols="12" sm="6">Items</v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            prepend-icon="mdi-filter"
            v-model="itemFilter"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <EmptyCargoCard v-if="!filteredItems.length">
      Items a have a chance to be found on each mine attempt. They can also be
      purchased on the market.
    </EmptyCargoCard>
    <v-list v-if="filteredItems.length">
      <v-row>
        <v-col
          cols="12"
          md="6"
          v-for="inventoryItem in filteredItems"
          :key="inventoryItem"
          class="mb-1"
        >
          <v-list-item
            @click="null"
            :elevation="inventoryItem.equipped ? 12 : 0"
            :border="inventoryItem.equipped"
          >
            <template v-slot:prepend>
              <v-sheet border class="mr-2">
                <v-img
                  cover=""
                  height="50"
                  width="50"
                  :src="
                    require('@/assets/img/' +
                      itemImage(inventoryItem.item.name))
                  "
                />
              </v-sheet>
            </template>
            <v-list-item-title>
              {{ inventoryItem.item.name }}
              <v-chip
                density="compact"
                color="success"
                v-if="inventoryItem.equipped"
              >
                Equipped
              </v-chip>
            </v-list-item-title>
            <v-list-item-title class="text-body-2">
              <v-row>
                <v-chip variant="plain" density="compact">
                  {{ inventoryItem.item.type }}
                </v-chip>
                <v-spacer />
                {{ inventoryItem.quantity }}
              </v-row>
            </v-list-item-title>
          </v-list-item>
        </v-col>
      </v-row>
    </v-list>
  </v-card>
</template>

<script>
import { useInventoryStore } from "@/stores/inventoryStore";
import items from "@/utilities/game-library/items";
import EmptyCargoCard from "@/components/EmptyCargoCard";
export default {
  name: "CargoItemsCard",
  components: { EmptyCargoCard },
  data() {
    return {
      inventoryStore: useInventoryStore(),
      itemFilter: "",
      filteredItems: [],
    };
  },
  watch: {
    inventoryItems: function () {
      this.filteredItems = this.inventoryItems;
    },
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
  computed: {
    inventoryItems: function () {
      return this.inventoryStore.getItems;
    },
  },
  methods: {
    itemImage: function (name) {
      return items.getImage(name);
    },
  },
};
</script>

<style scoped></style>
