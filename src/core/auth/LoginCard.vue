<template>
  <v-card border>
    <v-card-text>
      <v-form lazy-validation ref="form" v-model="validForm">
        <label>Email</label>
        <v-text-field
          :rules="emailRules"
          append-icon="mdi-email"
          type="email"
          v-model="form.email"
        />
        <label>Password</label>
        <v-text-field
          :rules="passwordRules"
          append-icon="mdi-lock"
          type="password"
          v-model="form.password"
        />
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-space-between">
      <v-btn color="primary" @click="$emit('toggleForm')" variant="plain">
        Create Account
      </v-btn>
      <v-btn
        color="primary"
        append-icon="mdi-chevron-right"
        @click="onSubmit"
        variant="tonal"
      >
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import fetcher from "@/utilities/api/fetcher";
import routes from "@/utilities/api/fetcher/routes";
import socket from "@/utilities/api/socket";

import { useAccountStore } from "@/stores/accountStore";
import { createToast } from "mosha-vue-toastify";

export default {
  name: "LoginCard",

  data: () => ({
    accountStore: useAccountStore(),
    validForm: false,
    form: {
      email: "",
      password: "",
    },
    emailRules: [
      (v) => !!v || "Required",
      (v) =>
        (!!v && !v) ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid",
    ],
    passwordRules: [(v) => !!v || "Required"],
  }),
  methods: {
    onSubmit: async function () {
      this.$refs.form.validate();
      if (this.validForm) {
        const request = {
          email: this.form.email,
          password: this.form.password,
        };
        let response = await fetcher.postData(routes.account.login, request);
        this.popToast(response.success, response.message);
        if (response.success) {
          if (response.data.emailVerified === false) {
            this.$router.push({ name: "verify.email" });
          } else {
            this.accountStore.setIsLoggedIn(true);
            this.accountStore.setToken(response.data.token);
            this.accountStore.setEmail(this.form.email);
            await socket.connect();
          }
        }
      }
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
