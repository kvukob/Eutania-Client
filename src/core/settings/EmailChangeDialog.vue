<template>
  <div class="text-center">
    <v-btn color="primary" variant="tonal">
      <v-icon>mdi-circle-edit-outline</v-icon>
      <v-dialog v-model="dialog" activator="parent">
        <v-card class="pa-2" width="320px">
          <v-row class="justify-center">
            <v-icon color="secondary" size="50"> mdi-email-edit </v-icon>
          </v-row>
          <v-card-title class="text-center text-overline">
            Email Change
          </v-card-title>
          <v-divider class="ma-5" />
          <v-card class="pa-2" color="transparent">
            <v-form ref="form" v-model="validForm">
              <label>New Email Address</label>
              <v-text-field
                :rules="emailRules"
                prepend-icon="mdi-email"
                v-model="form.newEmail"
              />
            </v-form>
          </v-card>
          <v-alert class="text-center" color="info">
            Upon changing your email, an account reset code will be sent to your
            old email address in case you need to revert any changes.
          </v-alert>
          <v-divider class="ma-5" />
          <v-card-actions class="justify-space-between">
            <v-btn color="error" @click="dialog = false"> Cancel </v-btn>
            <v-btn
              color="success"
              @click="submit"
              variant="tonal"
              append-icon="mdi-chevron-right"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
</template>

<script>
import fetcher from "@/utilities/api/fetcher";
import routes from "@/utilities/api/fetcher/routes";
import { useAccountStore } from "@/stores/accountStore";
import { createToast } from "mosha-vue-toastify";
export default {
  name: "EmailChangeDialog",
  data: () => ({
    accountStore: useAccountStore(),
    dialog: false,
    validForm: false,
    form: {
      newEmail: "",
    },
    emailRules: [
      (v) => !!v || "Required",
      (v) =>
        (!!v && !v) ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid",
    ],
  }),
  watch: {
    dialog() {
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
    },
  },
  methods: {
    submit: async function () {
      this.$refs.form.validate();
      if (this.validForm) {
        let request = {
          newEmail: this.form.newEmail,
        };
        let response = await fetcher.postData(
          routes.account.changeEmail,
          request
        );
        this.popToast(response.success, response.message);
        if (response.success) {
          this.accountStore.setEmail(this.form.newEmail);
          this.dialog = false;
        }
      }
    },
    popToast: function (isSuccess, message) {
      createToast(
        { title: message, description: "" },
        {
          type: isSuccess ? "success" : "warning",
          position: "top-right",
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
