<template>
  <v-card>
    <v-list>
      <v-list-item
        v-for="item in helpText"
        :key="item"
        @click="null"
        variant="plain"
      >
        <template v-slot:prepend>
          <v-icon color="secondary">mdi-hand-pointing-right</v-icon>
        </template>
        {{ item }}
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "GameInfoHarvester",
  data: () => ({
    helpText: [
      "Each mine attempt brings with it guaranteed resources, as well " +
        "as a chance for an item to drop. Items have a small chance at " +
        "dropping, so don't expect them every attempt.",
      "Each mine attempt brings with it guaranteed resources, " +
        "as well as a chance for an item to drop. Items have a small " +
        "chance at dropping, so don't expect them every attempt.",
      "Mine attempts have auras such as [Yield Loss], or [Raid Loss]. " +
        "These have a chance of occurring on each mine attempt " +
        "and can be mitigated (or boosted) through items.",
      "If a sector is unowned, each mine attempt has a small " +
        "chance at claiming that sector as your own. Sector " +
        "rarities are determined upon mining.",
      "Be weary of where you mine. Sector owners can charge " +
        "commission rates to players mining on their sectors. " +
        "In a future update, you may consider paying higher commission " +
        "rates due to the boosts the sectors provide you and your harvester. " +
        "There will be much more to do on sectors than just mine on them.",
    ],
  }),
};
</script>

<style scoped></style>
