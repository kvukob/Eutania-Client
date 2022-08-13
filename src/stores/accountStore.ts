// @ts-check
import { defineStore } from "pinia";

export const useAccountStore = defineStore({
  id: "account",

  state: () => ({
    isLoggedIn: false,
    token: "",
    email: "",
    username: "",
  }),

  getters: {
    // automatically infers the return type as a number
    getIsLoggedIn(state) {
      return state.isLoggedIn;
    },
    getToken(state) {
      return state.token;
    },
    getEmail(state) {
      return state.email;
    },
    getUsername(state) {
      return state.username;
    },
  },

  actions: {
    setIsLoggedIn(flag: boolean) {
      this.isLoggedIn = flag;
    },
    setToken(token: string) {
      this.token = token;
    },
    setEmail(email: string) {
      this.email = email;
    },
    setUsername(username: string) {
      this.username = username;
    },
  },
});
