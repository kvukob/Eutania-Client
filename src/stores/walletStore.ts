// @ts-check
import { defineStore } from "pinia";

type Wallet = {
  balance: number;
};

export const useWalletStore = defineStore({
  id: "wallet",

  state: () => ({
    balance: 0.0,
  }),

  getters: {
    getBalance(state): number {
      return Number.parseFloat(state.balance.toFixed(2));
    },
  },

  actions: {
    setWallet(w: Wallet) {
      this.balance = w.balance;
    },
  },
});
