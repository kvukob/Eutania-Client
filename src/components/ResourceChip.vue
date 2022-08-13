<template>
  <v-chip variant="text">
    <template v-slot:prepend>
      <v-avatar size="small">
        <v-img
          :src="require('@/assets/img/items/resource/' + resource.Image)"
        />
      </v-avatar>
    </template>
    {{ resource.Name }}
  </v-chip>
</template>

<script>
export default {
  name: "ResourceChip",
  props: {
    resource: {
      Name: String,
      Rarity: String,
      State: String,
      Image: String,
    },
  },
};
</script>

<style scoped></style>
