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
      <v-card border class="pa-5" v-if="mustVerify">
        <v-row class="justify-center">
          <v-icon color="secondary" size="50"> mdi-email-alert </v-icon>
        </v-row>
        <v-card-text class="text-center text-overline">
          You need to verify your email address before playing.
          <v-divider class="ma-2" />
          Please check your inbox to continue.
        </v-card-text>
        <v-alert variant="tonal">
          <v-alert-title class="text-body-2 justify-space-between">
            Haven't received your code?

            <v-btn variant="plain" color="primary">Resend Email</v-btn>
          </v-alert-title>
        </v-alert>
      </v-card>
      <v-card border class="pa-5" v-if="!mustVerify">
        <v-row class="justify-center">
          <v-icon color="secondary" size="50"> mdi-check </v-icon>
        </v-row>
        <v-card-text class="text-center text-overline">
          Your email address have been verified!
        </v-card-text>
        <v-divider class="ma-2" />
        <v-card-actions>
          <v-btn variant="tonal" color="primary" :to="{ name: 'login' }">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import fetcher from "@/utilities/api/fetcher";
export default {
  name: "VerifyEmailView",

  data: () => ({
    mustVerify: null,
  }),

  beforeMount() {
    this.loadView();
  },

  methods: {
    loadView: async function () {
      if (this.$route.params.code) {
        let verificationCode = this.$route.params.code;

        let response = await fetcher.getData(
          "account/verify-email/" + verificationCode
        );

        console.log(response);

        if (response.success) {
          this.mustVerify = false;
        }
      } else {
        this.mustVerify = true;
      }
    },
  },
};
</script>

<style scoped></style>
