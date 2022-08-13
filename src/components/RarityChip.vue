<template>
  <v-chip class="text-overline" density="compact" :color="rarityColor">
    {{ rarity }}
  </v-chip>
</template>

<script>
import colors from "@/utilities/game-library/colors";
export default {
  name: "RarityChip",
  props: {
    rarity: String,
  },
  computed: {
    rarityColor() {
      return colors.getRarityColor(this.rarity);
    },
  },
};
</script>

<style scoped></style>
