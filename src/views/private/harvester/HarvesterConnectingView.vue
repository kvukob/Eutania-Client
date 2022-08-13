<template>
  <v-row
    class="justify-center"
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    "
  >
    <v-col cols="4">
      <v-card
        color="transparent"
        class="pa-5 d-flex flex-column justify-center align-center"
      >
        <v-sheet
          height="250"
          width="250"
          color="transparent"
          class="d-flex flex-column justify-center align-center"
        >
          <div class="loader"></div>
        </v-sheet>

        <v-alert color="primary">
          <v-alert-title class="text-overline text-center">
            Establishing link to harvester
          </v-alert-title>
        </v-alert>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import socket from "@/utilities/api/socket";
import moment from "moment";
import { useHarvesterStore } from "@/stores/harvesterStore";

export default {
  name: "HarvesterConnectingView",
  data() {
    return {
      harvesterStore: useHarvesterStore(),
      remaining: null,
    };
  },
  beforeMount() {
    this.loadView();
  },
  computed: {
    cooldown: function () {
      let temp = this.harvesterStore.getCooldown;
      if (!temp.toString().includes("Z")) temp += "Z";
      return moment(temp).utc();
    },
  },
  watch: {
    remaining: async function (r) {
      if (r <= 0) {
        await this.$router.push({ name: "harvester.online" });
      } else {
        await this.$router.push({ name: "harvester.maintenance" });
      }
    },
  },
  methods: {
    loadView: async function () {
      await socket.getInventory();
      await socket.getHarvester();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.getRemaining();
      await this.$router.push({ name: "harvester.online" });
    },
    getRemaining: function () {
      let current = moment().utc();
      this.remaining = moment(this.cooldown).diff(current, "seconds");
    },
  },
};
</script>

<style scoped>
.loader {
  height: 50px;
  width: 10px;
  border-radius: 4px;
  color: rgba(var(--v-theme-secondary), 1);
  background: rgba(var(--v-theme-primary), 1);
  position: relative;
  animation: ht 1s ease-in infinite alternate;
  box-shadow: 15px 0 0 -1px, -15px 0 0 -1px, 30px 0 0 -2px, -30px 0 0 -2px,
    45px 0 0 -3px, -45px 0 0 -3px;
}

@keyframes ht {
  100% {
    height: 0px;
  }
}
</style>
