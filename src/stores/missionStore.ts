// @ts-check
import { defineStore } from "pinia";

type Missions = [];

export const useMissionStore = defineStore({
  id: "mission",

  state: () => ({
    resourceMissions: [],
  }),

  getters: {
    getResourceMissions(state) {
      return state.resourceMissions;
    },
  },

  actions: {
    setResourceMissions(m: Missions) {
      this.resourceMissions = m;
    },
  },
});
