<template>
  <v-card border>
    <v-card-text class="text-center">
      <v-alert variant="tonal" class="text-overline"> Empty Cargo </v-alert>
      <v-divider class="ma-5" />
      <v-alert variant="tonal" color="info">
        <slot />
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "EmptyCargoCard",
};
</script>

<style scoped></style>
