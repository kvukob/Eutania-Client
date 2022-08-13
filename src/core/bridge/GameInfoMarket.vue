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
  name: "GameInfoMarket",
  data: () => ({
    helpText: [
      "All market transactions incur a 4% EUA fee to be collected " +
        "upon sale/purchase. Listing items will always be free.",
      "Expect prices to be volatile until liquidity enters the market. " +
        "You could end up overpaying for resources. Coincidentally, " +
        "the opportunities to buy undervalued items exists as well.",
      "Sectors are able to be traded on the market. Listing a " +
        "sector will put all equipped sector items back into your cargo. " +
        "Sectors are sold 'like-new'.",
      "Market sales are final and will not be reversed under any circumstance.",
    ],
  }),
};
</script>

<style scoped></style>
