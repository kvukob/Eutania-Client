<template>
  <v-card class="overflow-auto" border>
    <v-card
      class="d-flex flex-wrap pa-0"
      style="width: 1056px; height: 600px"
      :style="{
        'background-image':
          'url(' +
          require('../../assets/img/planets/maps/' +
            planetName.toLowerCase() +
            '.png') +
          ')',
      }"
    >
      <div v-for="i in 144" :key="i" @click="1 > 2">
        <v-hover v-slot="{ isHovering, props }">
          <v-btn
            :color="
              i === selected
                ? 'rgba(var(--v-theme-primary),0.75)'
                : 'rgba(var(--v-theme-surface),0.5)'
            "
            width="30px"
            height="64px"
            style="margin: 1px"
            @click="onSelect(i)"
            v-bind="props"
            :variant="i === selected ? 'tonal' : 'outlined'"
          >
            <v-sheet
              border
              v-if="isHovering || i === selected"
              class="text-caption"
            >
              {{ sectorPrefix }}-{{ i }}
            </v-sheet>
          </v-btn>
        </v-hover>
      </div>
    </v-card>
  </v-card>
</template>

<script>
import fetcher from "@/utilities/api/fetcher";
import routes from "@/utilities/api/fetcher/routes";
export default {
  name: "SectorMap",
  props: {
    planetName: String,
  },
  data() {
    return {
      selected: null,
    };
  },
  watch: {
    planetName: function () {
      this.selected = null;
    },
  },
  computed: {
    sectorPrefix: function () {
      return this.planetName.substring(0, 3).toUpperCase();
    },
  },
  methods: {
    onSelect: async function (i) {
      this.selected = i;
      let response = await fetcher.getData(
        routes.sector.get + "/" + this.sectorPrefix + "-" + i
      );
      this.$emit("selectedSector", response["data"]["sector"]);
    },
  },
};
</script>

<style scoped></style>
