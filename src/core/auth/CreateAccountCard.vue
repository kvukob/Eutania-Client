<template>
  <v-card border>
    <v-card-text>
      <v-form ref="form" v-model="validForm">
        <label>Username</label>
        <v-text-field
          v-on:keypress="isLetter($event)"
          :rules="requiredRule"
          append-icon="mdi-account"
          v-model="form.username"
          @keyup="formatUsername"
        />
        <label>Email</label>
        <v-text-field
          :rules="emailRules"
          append-icon="mdi-email"
          type="email"
          v-model="form.email"
        />
        <label>Password</label>
        <v-text-field
          :rules="requiredRule"
          append-icon="mdi-lock"
          type="password"
          v-model="form.password"
        />
        <label>Verify Password</label>
        <v-text-field
          :rules="[verifyPasswordRule]"
          append-icon="mdi-lock"
          type="password"
          v-model="form.verifyPassword"
        />
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-space-between">
      <v-btn color="error" @click="$emit('toggleForm')"> Back </v-btn>
      <v-btn
        color="primary"
        append-icon="mdi-chevron-right"
        @click="onSubmit"
        variant="tonal"
      >
        Continue
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import fetcher from "@/utilities/api/fetcher";
import routes from "@/utilities/api/fetcher/routes";

import { useAccountStore } from "@/stores/accountStore";
import { createToast } from "mosha-vue-toastify";

export default {
  name: "CreateAccountCard",

  data: () => ({
    accountStore: useAccountStore(),
    validForm: false,
    form: {
      username: null,
      email: "",
      password: "",
      verifyPassword: "",
    },
    emailRules: [
      (v) => !!v || "Required",
      (v) =>
        (!!v && !v) ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid",
    ],
    requiredRule: [(v) => !!v || "Required"],
  }),

  computed: {
    verifyPasswordRule() {
      return () =>
        this.form.password === this.form.verifyPassword ||
        "Passwords must match";
    },
  },

  methods: {
    formatUsername() {
      if (this.form.username.length < 1) {
        this.form.username = "";
        return;
      }
      this.form.username = this.form.username.toLowerCase();
      this.form.username = this.form.username.replace(
        /^./,
        this.form.username[0].toUpperCase()
      );
    },
    onSubmit: async function () {
      this.$refs.form.validate();
      if (this.validForm) {
        const request = {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
        };
        let response = await fetcher.postData(routes.account.create, request);
        this.popToast(response.success, response.message);
        if (response.success) {
          this.$emit("toggleForm");
        }
      }
    },
    isLetter(e) {
      let char = String.fromCharCode(e.keyCode); // Get the character
      if (/^[A-Za-z]+$/.test(char)) return true; // Match with regex
      else e.preventDefault(); // If not match, don't add to input text
    },
    popToast: function (isSuccess, message) {
      createToast(
        { title: message, description: "" },
        {
          type: isSuccess ? "success" : "warning",
          position: "bottom-right",
          hideProgressBar: true,
          showIcon: true,
          timeout: 5000,
        }
      );
    },
  },
};
</script>

<style scoped></style>
