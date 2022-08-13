<template>
  <div class="text-center">
    <v-card border class="d-flex" @click="null">
      <template v-slot:prepend>
        <v-card border class="mr-2" v-if="currentlyEquippedItem">
          <v-img
            cover=""
            width="50"
            height="50"
            :src="
              require('@/assets/img/' +
                itemImage(currentlyEquippedItem.item.name))
            "
          />
        </v-card>
        <v-card
          border
          class="mr-2"
          v-if="!currentlyEquippedItem"
          variant="plain"
        >
          <v-icon size="50" color="primary">mdi-close</v-icon>
        </v-card>
      </template>
      <v-row class="align-center">
        <v-card-title class="text-body-1" v-if="currentlyEquippedItem">
          {{ currentlyEquippedItem.item.name }}
        </v-card-title>
        <v-card-title class="text-body-1" v-if="!currentlyEquippedItem">
          Empty Slot
        </v-card-title>
        <v-spacer />
        <v-card-title class="text-h6">
          {{ itemType.replace("Harvester", "") }}
        </v-card-title>
      </v-row>
      <v-dialog max-width="960" v-model="dialog" activator="parent">
        <v-card border class="ma-5a">
          <v-row class="overflow-x-auto" style="max-height: 500px">
            <v-col v-if="!items.length" cols="12">
              <EmptyCargoCard>
                You can purchase {{ this.itemType }}s on the market, or if
                you're lucky, you can get one as a drop while mining!
              </EmptyCargoCard>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              lg="4"
              v-for="inventoryItem in items"
              :key="inventoryItem"
            >
              <v-card>
                <v-sheet border height="50">
                  <v-img
                    cover=""
                    height="50"
                    :src="
                      require('@/assets/img/' +
                        itemImage(inventoryItem.item.name))
                    "
                  />
                </v-sheet>
                <v-card-text class="text-center">
                  {{ inventoryItem.item.name }}
                </v-card-text>
                <div class="d-flex flex-column align-center">
                  <v-chip
                    v-for="feature in itemFeatures(inventoryItem.item.name)"
                    :key="feature"
                  >
                    {{ feature.text }}
                  </v-chip>
                </div>

                <v-card-actions>
                  <v-btn
                    variant="tonal"
                    @click="equipItem(inventoryItem.item.name)"
                    color="primary"
                    v-if="!inventoryItem.equipped"
                    block=""
                  >
                    Equip
                  </v-btn>
                  <v-btn v-if="inventoryItem.equipped" disabled block="">
                    Equipped
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
        <v-card>
          <v-card-text class="text-center" v-if="items.length">
            <v-alert color="info" variant="tonal">
              You can only have one item of this type equipped at a time.
            </v-alert>
            <v-alert color="warning" variant="tonal">
              Equipping an item will place your harvester in maintenance mode
              for a short duration while installation is in progress.
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" block="" @click="dialog = false">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import items from "@/utilities/game-library/items";
import { useInventoryStore } from "@/stores/inventoryStore";
import socket from "@/utilities/api/socket";
import EmptyCargoCard from "@/components/EmptyCargoCard";
export default {
  name: "HarvesterEquipCard",
  components: { EmptyCargoCard },
  props: {
    itemType: String,
  },
  data() {
    return {
      dialog: false,
      inventoryStory: useInventoryStore(),
      items: [],
    };
  },
  beforeMount() {
    this.items = this.inventoryStory.getItemsByType(this.itemType);
  },
  computed: {
    currentlyEquippedItem: function () {
      return this.items.find((i) => i.equipped);
    },
  },
  methods: {
    itemImage: function (name) {
      return items.getImage(name);
    },
    itemFeatures: function (itemName) {
      return items.getFeatures(itemName);
    },
    equipItem: async function (itemName) {
      await socket.equipHarvesterItem(itemName);
    },
  },
};
</script>

<style scoped></style>
