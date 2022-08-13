<template>
  <v-app>
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="pa-0">
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer
      border
      style="position: fixed; bottom: 0; right: 0"
      class="pa-0 d-flex align-center"
    >
      <v-card border class="text-secondary text-overline ma-0 pl-2 pr-2">
        <v-row class="align-center">
          <p>&copy;</p>
          2022 Eutania
        </v-row>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {},
  data() {
    return {
      //
    };
  },
});
</script>

<style>
@import "styles.css";
</style>
