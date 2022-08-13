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
          <v-alert-title class="justify-center text-overline">
            Maintenance Mode
          </v-alert-title>
          <v-alert-title class="text-center">
            {{ remaining }} seconds remaining
          </v-alert-title>
        </v-alert>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import moment from "moment";
import { useHarvesterStore } from "@/stores/harvesterStore";

export default {
  name: "HarvesterMaintenanceView",
  data() {
    return {
      harvesterStore: useHarvesterStore(),
      cooldownInterval: null,
      remaining: null,
    };
  },
  async beforeMount() {
    this.cooldownInterval = setInterval(() => {
      this.getRemaining();
    }, 1000);
  },
  computed: {
    sectorName: function () {
      return this.harvesterStore.getSectorName;
    },
    cooldown: function () {
      let temp = this.harvesterStore.getCooldown;
      if (!temp.toString().includes("Z")) temp += "Z";
      return moment(temp).utc();
    },
  },
  watch: {
    remaining: async function (time) {
      if (time <= 0) {
        await this.$router.push({ name: "harvester.connect" });
      }
    },
  },
  methods: {
    getRemaining: function () {
      this.current = moment().utc();
      this.remaining = moment(this.cooldown).diff(this.current, "seconds");
    },
  },
  beforeUnmount() {
    clearInterval(this.cooldownInterval);
  },
};
</script>

<style scoped>
.loader {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 6rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  border-radius: 50%;
  animation: pulsOut 1.8s ease-in-out infinite;
  filter: drop-shadow(0 0 1rem rgba(var(--v-theme-secondary), 1));
}
.loader:before {
  width: 100%;
  padding-bottom: 100%;
  box-shadow: inset 0 0 0 1rem #fff;
  animation-name: pulsIn;
}
.loader:after {
  width: calc(100% - 2rem);
  padding-bottom: calc(100% - 2rem);
  box-shadow: 0 0 0 0 #fff;
}

@keyframes pulsIn {
  0% {
    box-shadow: inset 0 0 0 1rem #fff;
    opacity: 1;
  }
  50%,
  100% {
    box-shadow: inset 0 0 0 0 #fff;
    opacity: 0;
  }
}

@keyframes pulsOut {
  0%,
  50% {
    box-shadow: 0 0 0 0 #fff;
    opacity: 0;
  }
  100% {
    box-shadow: 0 0 0 1rem #fff;
    opacity: 1;
  }
}
</style>
