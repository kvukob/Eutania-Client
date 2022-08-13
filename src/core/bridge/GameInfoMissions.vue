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
  name: "GameInfoMissions",
  data: () => ({
    helpText: [
      "Missions have a finite amount of times they can be completed " +
        "before a new one is made available.",
      "Rewards for completing missions are currently limited to EUA only.",
    ],
  }),
};
</script>

<style scoped></style>
