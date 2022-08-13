<template>
  <v-navigation-drawer
    permanent=""
    :rail="true"
    color="transparent"
    floating=""
  >
    <v-icon size="x-large" color="secondary" class="ml-3"> mdi-alpha-e </v-icon>
    <v-divider class="mb-2" />
    <v-list
      nav
      density="compact"
      bg-color="rgba(var(--v-theme-surface), 0.5)"
      color="primary"
    >
      <v-list-item
        rounded="lg"
        variant="tonal"
        class="justify-start"
        :disabled="isConnectingToHarvester"
        v-for="item in nav"
        :key="item"
        :to="{ name: item.routerLink }"
        block=""
        :title="item.title"
        :value="item.title"
      >
        <template v-slot:prepend>
          <v-avatar size="small">
            <v-img :src="require('@/assets/img/icons/' + item.icon)" />
          </v-avatar>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "GameNavigation",
  data: () => ({
    nav: [
      {
        title: "Bridge",
        routerLink: "bridge",
        icon: "bridge.svg",
      },
      {
        title: "Harvester",
        routerLink: "harvester.connect",
        icon: "harvester.svg",
      },
      {
        title: "Cargo",
        routerLink: "cargo",
        icon: "cargo.svg",
      },
      {
        title: "Sectors",
        routerLink: "sector",
        icon: "sector.svg",
      },
      {
        title: "Missions",
        routerLink: "missions",
        icon: "mission.svg",
      },
      {
        title: "Market",
        routerLink: "market.browse.eutania",
        icon: "market.svg",
      },
      {
        title: "Settings",
        routerLink: "settings",
        icon: "settings.svg",
      },
    ],
  }),
  computed: {
    isConnectingToHarvester: function () {
      if (this.$router.currentRoute.value.name === "harvester.connect")
        return true;
      return false;
    },
  },
};
</script>

<style scoped>
.drawer {
  background: url("~@/assets/img/backgrounds/space2.png") no-repeat center
    center fixed;
  background-size: cover;
}
</style>
