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
  name: "GameInfoSectors",
  data: () => ({
    helpText: [
      "Sectors can charge commission rates. This is received in " +
        "the form of resources from each mine action that occurs " +
        "on that sector.",
      "(Upcoming) Sectors will be able to provide their own auras " +
        "to players to increase yields, protect against raids, and more.",
      "Sectors can be freely traded on the market. While listed, " +
        "sectors will not receive any commission rates, nor " +
        "will commission rates be charged to miners.",
    ],
  }),
};
</script>

<style scoped></style>
