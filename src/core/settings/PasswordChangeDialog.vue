<template>
  <div class="text-center">
    <v-btn color="primary" variant="tonal">
      <v-icon>mdi-circle-edit-outline</v-icon>
      <v-dialog v-model="dialog" activator="parent">
        <v-card class="pa-2" width="320px">
          <v-row class="justify-center">
            <v-icon color="secondary" size="50"> mdi-lock-reset </v-icon>
          </v-row>
          <v-card-title class="text-center text-overline">
            Password Change
          </v-card-title>
          <v-divider class="ma-5" />
          <v-card class="pa-2" color="transparent">
            <v-form ref="form" v-model="validForm">
              <label>Current Password</label>
              <v-text-field
                :rules="requiredRule"
                v-model="form.currentPassword"
                prepend-icon="mdi-lock"
                type="password"
              />
              <label>New Password</label>
              <v-text-field
                :rules="requiredRule"
                v-model="form.newPassword"
                prepend-icon="mdi-lock-outline"
                type="password"
              />
              <label>Confirm New Password</label>
              <v-text-field
                :rules="[verifyPasswordRule]"
                v-model="form.confirmNewPassword"
                prepend-icon="mdi-lock-outline"
                type="password"
              />
            </v-form>
          </v-card>
          <v-alert class="text-center" color="info">
            Ensure you use a unique, strong password to help protect your
            account.
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
import { createToast } from "mosha-vue-toastify";

export default {
  name: "PasswordChangeDialog",
  data: () => ({
    dialog: false,
    validForm: false,
    form: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    requiredRule: [(v) => !!v || "Required"],
  }),
  computed: {
    verifyPasswordRule() {
      return () =>
        this.form.newPassword === this.form.confirmNewPassword ||
        "Passwords must match";
    },
  },
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
          currentPassword: this.form.currentPassword,
          newPassword: this.form.newPassword,
          confirmNewPassword: this.form.confirmNewPassword,
        };
        let response = await fetcher.postData(
          routes.account.changePassword,
          request
        );
        this.popToast(response.success, response.message);
        if (response.success) {
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
