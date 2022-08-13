<template>
  <div>
    <v-card>
      <v-card-actions>
        <v-btn-toggle mandatory density="compact">
          <v-btn
            border
            color="primary"
            variant="tonal"
            :to="{ name: 'market.browse.eutania' }"
          >
            <v-icon color="success">mdi-magnify</v-icon>
            Browse
          </v-btn>
          <v-btn
            border
            color="primary"
            variant="tonal"
            :to="{ name: 'market.sell' }"
          >
            <v-icon color="error">mdi-credit-card-minus-outline</v-icon>
            Sell
          </v-btn>
        </v-btn-toggle>
      </v-card-actions>
    </v-card>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "MarketView",
};
</script>

<style scoped></style>
