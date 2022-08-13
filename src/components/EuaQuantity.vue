<template>
  <v-chip
    border
    style="background-color: rgb(var(--v-theme-background))"
    class="d-flex align-center justify-end"
  >
    <v-avatar size="x-small" class="mr-2">
      <v-img :src="require('@/assets/img/icons/eua.svg')" />
    </v-avatar>
    <div>
      {{ quantity }}
      <span v-if="false" class="text-caption ml-1">EUA</span>
    </div>
  </v-chip>
</template>

<script>
export default {
  name: "EuaQuantity",
  props: ["quantity"],
};
</script>

<style scoped></style>
