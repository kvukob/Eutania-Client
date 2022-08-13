<template>
  <v-row
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    "
  >
    <v-col cols="12" sm="6" md="5" lg="3">
      <v-card border class="pa-5">
        <v-row class="justify-center">
          <v-icon color="secondary" size="50"> mdi-account-settings </v-icon>
        </v-row>
        <v-card-title class="text-center"> Account Recovery </v-card-title>
        <v-divider class="ma-5" />
        <v-card-text class="text-overline">
          <label>New email address</label>
          <v-text-field prepend-icon="mdi-email" v-model="form.email" />
          <label>New password</label>
          <v-text-field prepend-icon="mdi-email" v-model="form.password" />
          <label>Confirm new password</label>
          <v-text-field
            prepend-icon="mdi-email"
            v-model="form.confirmPassword"
          />
        </v-card-text>
        <v-divider class="ma-2" />
        <v-card-actions>
          <v-btn block="" variant="tonal" color="primary" @click="submitForm">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import fetcher from "@/utilities/api/fetcher";
import routes from "@/utilities/api/fetcher/routes";
export default {
  name: "AccountRecoveryView",

  data: () => ({
    verificationCode: "",
    form: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  }),

  beforeMount() {
    this.loadView();
  },

  methods: {
    loadView: async function () {
      if (this.$route.params.code) {
        this.verificationCode = this.$route.params.code;
      }
    },
    submitForm: async function () {
      let request = {
        email: this.form.email,
        password: this.form.password,
        code: this.verificationCode,
      };
      let response = await fetcher.postData(
        routes.account.accountRecovery,
        request
      );
      console.log(response);
    },
  },
};
</script>

<style scoped></style>
