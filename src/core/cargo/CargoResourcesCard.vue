<template>
  <v-card border>
    <v-card-title class="text-overline text-secondary">Resources</v-card-title>
    <EmptyCargoCard v-if="!resources.length">
      Use your harvester to mine resources. Resources can also be purchased on
      the market.
    </EmptyCargoCard>
    <v-list v-if="resources.length">
      <v-list-item
        v-for="resource in resources"
        :key="resource"
        @click="null"
        class="mb-1"
      >
        <template v-slot:prepend>
          <v-sheet border class="mr-2">
            <v-img
              cover=""
              width="50"
              height="50"
              :src="
                require('@/assets/img/' + resourceImage(resource.item.name))
              "
            />
          </v-sheet>
        </template>
        <v-list-item-title> {{ resource.item.name }} </v-list-item-title>
        <v-list-item-title class="text-body-2">
          <v-row>
            <v-spacer />
            {{ qtyInCargo(resource.item.name) }} kg
          </v-row>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import items from "@/utilities/game-library/items";
import { useInventoryStore } from "@/stores/inventoryStore";
import EmptyCargoCard from "@/components/EmptyCargoCard";
export default {
  name: "CargoResourcesCard",
  components: { EmptyCargoCard },
  data() {
    return {
      inventoryStore: useInventoryStore(),
      a: null,
    };
  },
  computed: {
    resources: function () {
      return this.inventoryStore.getResources;
    },
  },
  methods: {
    resourceImage: function (name) {
      return items.getImage(name);
    },
    qtyInCargo: function (name) {
      return this.inventoryStore.getResourceQtyByName(name);
    },
  },
};
</script>

<style scoped></style>
