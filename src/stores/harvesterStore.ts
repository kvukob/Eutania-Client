// @ts-check
import { defineStore } from "pinia";

type Harvester = {
  onCooldown: boolean;
  cooldown: Date;
  sector: {
    name: string;
    commission: number;
    owner: string;
    planet: string;
    rarity: string;
  };
  laser: Laser;
};

type Laser = {
  name: string;
  type: string;
};

type Reward = {
  bonus: boolean;
  bonusQuantity: number;
  isRaided: boolean;
  quantity: number;
  raidLoss: number;
  resource: string;
  yieldLoss: number;
};

type MiningReward = {
  rewards: Array<Reward>;
  minedSector: boolean;
  minedSectorRarity: string;
  itemDropped: boolean;
  itemDropName: string;
  itemDropType: string;
  itemDropQuantity: number;
};

export const useHarvesterStore = defineStore({
  id: "harvester",

  state: () => ({
    onCooldown: false,
    cooldown: new Date(),
    sector: {
      commission: 0,
      name: "",
      owner: "",
      planet: "",
      rarity: "",
    },
    laser: {},
    miningRewards: {},
  }),

  getters: {
    getOnCooldown(state) {
      return state.onCooldown;
    },
    getCooldown(state) {
      return state.cooldown;
    },
    getSectorCommission(state) {
      return state.sector.commission;
    },
    getSectorName(state) {
      return state.sector.name;
    },
    getSectorOwner(state) {
      return state.sector.owner;
    },
    getSectorPlanet(state) {
      return state.sector.planet;
    },
    getSectorRarity(state) {
      return state.sector.rarity;
    },
    getLaser(state) {
      return state.laser;
    },
    getMiningRewards(state) {
      return state.miningRewards;
    },
  },

  actions: {
    setHarvester(harvester: Harvester) {
      this.onCooldown = harvester.onCooldown;
      this.cooldown = harvester.cooldown;
      this.sector.commission = harvester.sector.commission;
      this.sector.name = harvester.sector.name;
      this.sector.planet = harvester.sector.planet;
      this.sector.owner = harvester.sector.owner;
      this.sector.rarity = harvester.sector.rarity;
    },
    setOnCooldown(flag: boolean) {
      this.onCooldown = flag;
    },
    setCooldown(cooldown: Date) {
      this.cooldown = cooldown;
    },
    setMiningRewards(miningRewards: MiningReward) {
      this.miningRewards = miningRewards;
    },
  },
});
