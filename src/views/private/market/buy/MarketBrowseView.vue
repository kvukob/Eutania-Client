<template>
  <div>
    <v-card style="border-bottom: 1px solid rgb(var(--v-theme-secondary))">
      <v-card-title class="text-overline text-secondary">
        Available Markets
      </v-card-title>
      <v-card-actions>
        <v-btn-toggle mandatory density="compact">
          <v-btn
            border
            color="primary"
            variant="text"
            :to="{ name: 'market.browse.eutania' }"
          >
            Market Eutania
          </v-btn>
          <v-btn
            border
            color="primary"
            variant="text"
            :to="{ name: 'market.browse.sectors' }"
          >
            Sectors
          </v-btn>
        </v-btn-toggle>
      </v-card-actions>
    </v-card>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "MarketBrowseView",
};
</script>

<style scoped></style>
